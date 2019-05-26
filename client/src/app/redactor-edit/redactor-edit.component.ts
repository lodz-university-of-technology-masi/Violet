import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RedactorModel} from '../shared/model/redactor-model';
import {RedactorService} from '../shared/services/redactor.service';
import {RedactorListComponent} from '../redactor-list/redactor-list.component';
import {MessageService} from '../shared/services/message.service';
import {routerNgProbeToken} from '@angular/router/src/router_module';

@Component({
  selector: 'app-redactor-edit',
  templateUrl: './redactor-edit.component.html',
  styleUrls: ['./redactor-edit.component.css']
})
export class RedactorEditComponent implements OnInit {
  public redactorId: number;
  public redactor: RedactorModel;

  constructor(private route: ActivatedRoute, private redactorService: RedactorService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      this.redactorId = +p.get('redactorId');
    });
    this.redactorService.getRedactor(this.redactorId)
      .subscribe(r => this.redactor = r,
        e => this.messageService.error('redactor_get_error'));
  };

  submitForm() {
    this.redactorService.editRedactor(this.redactorId, this.redactor)
      .subscribe(() => {
        this.messageService.success('redactor_saved');
        this.router.navigate(['/redactor-list']);
      });
  }
}
