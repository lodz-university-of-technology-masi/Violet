import {Component, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserIdentity, UserRole} from './shared/model/user-model';
import {AuthService} from './shared/services/auth.service';
import {MessageService} from './shared/services/message.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {Metric} from './shared/model/metric-model';
import {MetricService} from './shared/services/metric.service';
import html2canvas from 'html2canvas';
import {UploadService} from './shared/services/upload.service';
import {Configuration} from './configuration';

const languages = ['pl', 'en'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userIdentity: UserIdentity = {
    email: 'not_login',
    roles: [UserRole.guest]
  };
  metric: Metric = {
    browser: '',
    resW: '',
    resH: '',
    mc: '',
    time: '',
    dist: '',
    fail: false
  };
  isLogged = false;
  UserRole = UserRole;
  time = 0;
  interval;
  startTimerValue = true;
  deviceInfo = '';
  clicksCounter = 0;
  width = 0;
  height = 0;
  distance = 0;
  currentX;
  currentY;
  even = 0;
  tempLS: any;

  static dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  constructor(private router: Router, private translateService: TranslateService, private authService: AuthService, private uploadService: UploadService,
              private messageService: MessageService, private config: Configuration, private deviceService: DeviceDetectorService, private metricService: MetricService) {
    this.authService.listen().subscribe(message => {
      if (message === 'login') {
        this.updateLoginAndRoles();
      } else if (message === 'logout') {
        this.updateLoginAndRoles();
      }
    });
    this.setupTranslationService();
    this.updateLoginAndRoles();
    this.getBrowser();
  }

  private setupTranslationService() {
    this.translateService.addLangs(languages);
    if (languages.includes(this.translateService.getBrowserLang())) {
      this.translateService.use(this.translateService.getBrowserLang());
    }
    this.translateService.setDefaultLang('en');
  }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  onPositionListClick() {
    this.router.navigate(['/positions-list']);

    if (!this.startTimerValue) {
      this.clicksCounter++;
    }
  }

  onAddPositionClick() {
    this.router.navigate(['/position-add']);

    if (!this.startTimerValue) {
      this.clicksCounter++;
    }
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }

  onRedactorListClick() {
    this.router.navigate(['/redactor-list']);

    if (!this.startTimerValue) {
      this.clicksCounter++;
    }
  }

  onAddRedactorClick() {
    this.router.navigate(['/redactor-add']);

    if (!this.startTimerValue) {
      this.clicksCounter++;
    }
  }

  onTestListClick() {
    this.router.navigate(['/test-list']);

    if (!this.startTimerValue) {
      this.clicksCounter++;
    }
  }

  onAddTestClick() {
    this.router.navigate(['/test-add']);

    if (!this.startTimerValue) {
      this.clicksCounter++;
    }
  }

  onImportTestClick() {
    this.router.navigate(['/test-import']);

    if (!this.startTimerValue) {
      this.clicksCounter++;
    }
  }

  onResolveTestListClick() {
    this.router.navigate(['/resolve-test-list']);
  }

  onLogoutClick() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.authService.addEvent('logout');
    this.updateLoginAndRoles();
    this.messageService.success('user_logout');
  }

  updateLoginAndRoles() {
    this.authService.getUserIdentity().subscribe(data => {
      this.userIdentity = data;
      this.isLogged = true;
    }, err => {
      this.isLogged = false;
      this.userIdentity.roles = [UserRole.guest];
    });
  }

  hasRole(permittedRoles: UserRole[]): boolean {
    for (const role of permittedRoles) {
      if (this.userIdentity.roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  onRedactorTestsListClick() {
    this.router.navigate(['/test-list-redactor']);

  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
    }, 100);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.time = this.time / 10;
    let integerDistance = Math.trunc(this.distance);
    this.saveDataInStorage(this.time, this.clicksCounter, integerDistance, this.deviceInfo, this.width, this.height);
  }

  saveDataInStorage(time: number, clicks: number, distance: number, browserName: String, width: number, height: number) {
    const jsonData = {
      'time': time,
      'clicks': clicks,
      'distance': distance,
      'browser': browserName,
      'width': width,
      'height': height
    };
    if (typeof (Storage) !== 'undefined') {
      const myJsonTime = JSON.stringify(jsonData);
      localStorage.setItem('Metrics', myJsonTime);
    } else {
      console.log('Sorry, your browser does not support web storage...');
      this.messageService.error('measurement_error');
    }
  }

  prepareBasicJsonMetric() {
    this.tempLS = JSON.parse(localStorage.getItem('Metrics'));
    this.metric.browser = this.tempLS.browser;
    this.metric.resW = this.tempLS.width.toString();
    this.metric.resH = this.tempLS.height.toString();
    this.metric.mc = this.tempLS.clicks.toString();
    this.metric.time = this.tempLS.time.toString();
    this.metric.dist = this.tempLS.distance.toString();
  }

  takeScreenshot() {
    const data = document.body;
    html2canvas(data).then(canvas => {
      const a = document.createElement('a');
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      const date = new Date();
      const filename = date.toISOString() + '.jpg';

      const dataURL = canvas.toDataURL('image/jpeg', 1.0);
      const blob = AppComponent.dataURItoBlob(dataURL);

      const formData = new FormData();
      formData.append('file', blob, filename);

      this.uploadService.uploadScreenshot(formData).subscribe( () => {
         this.messageService.info('screenshot_uploaded');
        }
      );
    });
  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey) {
      if (event.key === 'D'.valueOf()) {
        this.takeScreenshot();
        this.even++;
        if (this.startTimerValue) {
          this.startTimerValue = false;
          this.clicksCounter = 0;
          this.distance = 0;
          this.startTimer();
          this.messageService.info('measurement_started');
        } else {
          this.startTimerValue = true;
          this.pauseTimer();
          this.messageService.info('measurement_ended');
        }
        if (this.even % 2 === 0) {
          this.prepareBasicJsonMetric();
          this.metric.fail = false;
          this.metricService.importMetric(JSON.stringify(this.metric)).subscribe(() => {
            this.messageService.info('measurement_sent');
          });
        }
      } else if (event.key === 'W'.valueOf()) {
        this.even = 0;
        localStorage.removeItem('Metrics');
        this.messageService.info('measurement_aborted');
        this.messageService.info('local_storage_clear');
      } else if (event.key === 'R'.valueOf()) {
        this.even = 0;
        this.saveDataInStorage(this.time, this.clicksCounter, this.distance, this.deviceInfo, this.width, this.height);
        this.prepareBasicJsonMetric();
        this.metric.fail = true;
        this.metricService.importMetric(JSON.stringify(this.metric)).subscribe(() => {
          this.messageService.info('failed_measurement');
        });
        localStorage.removeItem('Metrics');
        this.messageService.info('local_storage_clear');
      }
    }
  }

  @HostListener('click', ['$event'])
  onMouseEnter(event: any) {
    this.clicksCounter++;
    let x = event.clientX;     // Get the horizontal coordinate
    let y = event.clientY;     // Get the vertical coordinate
    if (isNotNullOrUndefined(this.currentY) && isNotNullOrUndefined(this.currentX)) {
      this.distance += this.countDistance(this.currentX, this.currentY, x, y);
    }
    this.currentX = x;
    this.currentY = y;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
  }

  getBrowser() {
    this.deviceInfo = this.deviceService.browser.charAt(0);
  }

  countDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
}
