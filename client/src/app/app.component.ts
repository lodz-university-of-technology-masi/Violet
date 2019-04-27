import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {
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
