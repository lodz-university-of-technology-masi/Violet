import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

const languages = ['pl', 'en'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private translateService: TranslateService) {
    this.setupTranslationService();
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
}
