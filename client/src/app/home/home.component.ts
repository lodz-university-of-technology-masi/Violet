import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  startTest() {
    this.router.navigate(['/register-candidate']);
  }

  login() {
    this.router.navigate(['/login-user']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  existToken() {
    const token = localStorage.getItem('token');
    if (typeof token === 'undefined' || token === null || token === 'undefined') {
      return false;
    } else {
      return true;
    }
  }
}
