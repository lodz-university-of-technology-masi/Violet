import {Component, OnInit} from '@angular/core';
import {RedactorService} from '../shared/services/redactor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
import {NewRedactor} from '../shared/model/redactor-model';

@Component({
  selector: 'app-redactor-add',
  templateUrl: './redactor-add.component.html',
  styleUrls: ['./redactor-add.component.css']
})
export class RedactorAddComponent implements OnInit {
  redactor: NewRedactor = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    secondPassword: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private redactorService: RedactorService,
              private messageService: MessageService) {}

  ngOnInit() {
  }

  gotoList() {
    this.router.navigate(['/redactor-list']);
  }

  submitForm() {
    this.redactorService.save(this.redactor).subscribe(() => {
      this.messageService.success('Redactor has been added.');
      this.gotoList();
    });
  }
}
