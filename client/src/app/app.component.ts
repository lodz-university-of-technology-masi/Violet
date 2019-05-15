import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserIdentity, UserRole} from './shared/model/user-model';
import {AuthService} from './shared/services/auth.service';
import {MessageService} from './shared/services/message.service';
import {TestListWithVersions} from './shared/model/test-model';
import {DeviceDetectorModule, DeviceDetectorService} from 'ngx-device-detector';

const languages = ['pl', 'en'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userIdentity: UserIdentity = {
    email: 'not_login',
    roles: [UserRole.guest]
  };
  isLogged = false;
  UserRole = UserRole;
  timeLeft: number = 0;
  interval;
  startTimerValue = true;
  deviceInfo = '';

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

  onPositionListClick() {
    this.router.navigate(['/positions-list']);
  }

  onAddPositionClick() {
    this.router.navigate(['/position-add']);
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }

  onRedactorListClick() {
    this.router.navigate(['/redactor-list']);
  }

  onAddRedactorClick() {
    this.router.navigate(['/redactor-add']);
  }

  onTestListClick() {
    this.router.navigate(['/test-list']);
  }

  onAddTestClick() {
    this.router.navigate(['/test-add']);
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
      this.timeLeft++;
    }, 100);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timeLeft = this.timeLeft / 10;
    this.saveDataInStorage(this.timeLeft, this.deviceInfo);
  }

  saveDataInStorage(time: number, browserName: String) {
    const jsonData = {
      'time': time,
      'browser': browserName
    };
    if (typeof (Storage) !== 'undefined') {
      const myJsonTime = JSON.stringify(jsonData);
      localStorage.setItem('timeMetrics', myJsonTime);
    } else {
      console.log('Sorry, your browser does not support web storage...');
      this.messageService.error('measurement_error');
    }

  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'D'.valueOf() && event.shiftKey && this.startTimerValue === true) {
      this.startTimerValue = false;
      this.startTimer();
      this.messageService.info('measurement_started');
    } else if (event.key === 'D'.valueOf() && event.shiftKey && this.startTimerValue === false) {
      this.startTimerValue = true;
      this.pauseTimer();
      this.messageService.info('measurement_ended');
    }
  }

  getBrowser() {
    this.deviceInfo = this.deviceService.browser;
  }
}
