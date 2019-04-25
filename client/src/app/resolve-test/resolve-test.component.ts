import { Component, OnInit, Input } from '@angular/core';
import { TestService } from '../shared/services/test.service';
import { TestVersionContentModel, QuestionModel } from '../shared/model/test-model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resolve-test',
  templateUrl: './resolve-test.component.html',
  styleUrls: ['./resolve-test.component.css']
})
export class ResolveTestComponent implements OnInit {
  public test: TestVersionContentModel;
  private testVersionId: string;
  private token: string;
  questions: QuestionModel[] = [];
  answers: String[] = [];

  constructor(private testService: TestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p =>
      {
        this.testVersionId = p.get("testVersionId");
        this.token = p.get("token");
      });

    this.testService.getTest(this.testVersionId).subscribe(
        t => {
          this.test = t;
          this.setQuestions(t);
      }, 
        e => {console.log(e)});
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
    console.log("resolved i guess");
    console.log(this.answers);
  }

}
