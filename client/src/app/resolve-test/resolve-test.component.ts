import {Component, OnInit, Input} from '@angular/core';
import {TestService} from '../shared/services/test.service';
import {TestVersionContentModel, QuestionModel} from '../shared/model/test-model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ResolveTestModel} from '../shared/model/resolve-test-model';
import {MessageService} from '../shared/services/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resolve-test',
  templateUrl: './resolve-test.component.html',
  styleUrls: ['./resolve-test.component.css']
})
export class ResolveTestComponent implements OnInit {
  public test: TestVersionContentModel;
  private testVersionId: number;
  private token: string;
  questions: QuestionModel[] = [];
  answers: string[];

  constructor(private testService: TestService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      this.testVersionId = Number(p.get('testVersionId'));
      this.token = p.get('token');
    });

    this.testService.getTest(this.testVersionId).subscribe(
      t => {
        this.test = t;
        this.setQuestions(t);
        this.answers = new Array<string>(this.questions.length);
      },
      e => {
        console.log(e.message);
      });
  }

  setQuestions(t: TestVersionContentModel) {
    this.questions = this.questions
      .concat(t.test.choiceQuestions)
      .concat(t.test.numericQuestions)
      .concat(t.test.openQuestions)
      .concat(t.test.scaleQuestions);

    console.log(this.questions);
  }

  public resolveTest() {
    var test: ResolveTestModel = new ResolveTestModel();
    test.answers = this.answers;
    test.candidateToken = this.token;
    test.test = this.test;

    this.testService.resolveTest(test)
      .subscribe(
        t => {
          this.messageService.success('test_resolved');
          this.router.navigate(['/home']);
        });
  }

}
