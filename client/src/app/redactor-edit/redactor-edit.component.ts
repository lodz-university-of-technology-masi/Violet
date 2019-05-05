import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedactorModel } from '../shared/model/redactor-model';
import { RedactorService } from '../shared/services/redactor.service';
import { RedactorListComponent } from '../redactor-list/redactor-list.component';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-redactor-edit',
  templateUrl: './redactor-edit.component.html',
  styleUrls: ['./redactor-edit.component.css']
})
export class RedactorEditComponent implements OnInit {
  public redactorId: number;
  public redactor: RedactorModel;

  constructor(private route: ActivatedRoute, private redactorService: RedactorService, private messageService: MessageService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      this.redactorId = +p.get('redactorId');
    });
    this.redactorService.getRedactor(this.redactorId)
    .subscribe(r => this.redactor = r,
      e => this.messageService.error("redactor_get_error"))
  };

  submitForm() {
    this.redactorService.editRedactor(this.redactorId, this.redactor)
    .subscribe(s => this.messageService.success("redactor_saved"),
    e => this.messageService.error("redactor_edit_error"));
  }
}
