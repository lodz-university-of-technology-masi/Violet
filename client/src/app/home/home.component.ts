import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
import {AuthService} from '../shared/services/auth.service';
import {UserIdentity, UserRole} from '../shared/model/user-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged = true;

  constructor(private messageService: MessageService, private router: Router, private authService: AuthService) {
    this.updateLoginAndRoles();
    this.authService.listen().subscribe(message => {
      if (message === 'login') {
        this.updateLoginAndRoles();
      } else if (message === 'logout') {
        this.updateLoginAndRoles();
      }
    });
  }

  ngOnInit() {
  }

  startTest() {
    this.router.navigate(['/register-candidate']);
  }

  updateLoginAndRoles() {
    this.authService.getUserIdentity().subscribe(data => {
      this.isLogged = true;
    }, err => {
      this.isLogged = false;
    });
  }
}
