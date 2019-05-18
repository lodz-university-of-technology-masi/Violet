import {Component, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserIdentity, UserRole} from './shared/model/user-model';
import {AuthService} from './shared/services/auth.service';
import {MessageService} from './shared/services/message.service';
import {TestListWithVersions} from './shared/model/test-model';
import {DeviceDetectorModule, DeviceDetectorService} from 'ngx-device-detector';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

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

  constructor(private router: Router, private translateService: TranslateService, private authService: AuthService,
              private messageService: MessageService, private deviceService: DeviceDetectorService) {
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

    if (this.startTimerValue === false) {
      this.clicksCounter++;
    }
  }

  onAddPositionClick() {
    this.router.navigate(['/position-add']);

    if (this.startTimerValue === false) {
      this.clicksCounter++;
    }
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }

  onRedactorListClick() {
    this.router.navigate(['/redactor-list']);

    if (this.startTimerValue === false) {
      this.clicksCounter++;
    }
  }

  onAddRedactorClick() {
    this.router.navigate(['/redactor-add']);

    if (this.startTimerValue === false) {
      this.clicksCounter++;
    }
  }

  onTestListClick() {
    this.router.navigate(['/test-list']);

    if (this.startTimerValue === false) {
      this.clicksCounter++;
    }
  }

  onAddTestClick() {
    this.router.navigate(['/test-add']);

    if (this.startTimerValue === false) {
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
      this.userIdentity = {
        email: 'not_login',
        roles: [UserRole.guest]
      };
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
    this.saveDataInStorage(this.time, this.clicksCounter, integerDistance, this.deviceInfo);
  }

  saveDataInStorage(time: number, clicks: number, distance: number, browserName: String) {
    const jsonData = {
      'time': time,
      'clicks': clicks,
      'distance': distance,
      'browser': browserName
    };
    if (typeof (Storage) !== 'undefined') {
      const myJsonTime = JSON.stringify(jsonData);
      localStorage.setItem('Metrics', myJsonTime);
    } else {
      console.log('Sorry, your browser does not support web storage...');
      this.messageService.error('measurement_error');
    }

  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'D'.valueOf() && event.shiftKey && this.startTimerValue === true) {
      this.startTimerValue = false;
      this.clicksCounter = 0;
      this.distance = 0;
      this.startTimer();
      this.messageService.info('measurement_started');
    } else if (event.key === 'D'.valueOf() && event.shiftKey && this.startTimerValue === false) {
      this.startTimerValue = true;
      this.pauseTimer();
      this.messageService.info('measurement_ended');
    }
  }

  @HostListener('click', ['$event'])
  onMouseEnter(event: any) {
    this.clicksCounter++;
    let x = event.clientX;     // Get the horizontal coordinate
    let y = event.clientY;     // Get the vertical coordinate
    if(isNotNullOrUndefined(this.currentY) && isNotNullOrUndefined(this.currentX)){
      this.distance += this.countDistance(this.currentX,this.currentY,x,y);
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
  countDistance(x1: number, y1: number, x2: number, y2: number): number{
    return  Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
  }
}
