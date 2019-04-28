import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {MessageService} from '../shared/services/message.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})

export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value);

    this.authService.login(body.toString()).subscribe(data => {
      localStorage.setItem('token', JSON.stringify(data));
      this.router.navigate(['']);
      this.messageService.success('logged_in');
    });
  }
}
