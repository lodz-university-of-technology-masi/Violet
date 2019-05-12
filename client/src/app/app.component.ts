import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserIdentity, UserRole} from './shared/model/user-model';
import {AuthService} from './shared/services/auth.service';
import {MessageService} from './shared/services/message.service';

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

  constructor(private router: Router, private translateService: TranslateService, private authService: AuthService, private messageService: MessageService) {
    this.authService.listen().subscribe(message => {
      if (message === 'login') {
        this.updateLoginAndRoles();
      } else if (message === 'logout') {
        this.updateLoginAndRoles();
      }
    });
    this.setupTranslationService();
    this.updateLoginAndRoles();
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

}
