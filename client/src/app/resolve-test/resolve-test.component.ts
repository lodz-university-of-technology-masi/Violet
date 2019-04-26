import { Component, OnInit, Input } from '@angular/core';
import { TestService } from '../shared/services/test.service';
import { TestVersionContentModel, QuestionModel } from '../shared/model/test-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ResolveTestModel } from '../shared/model/resolve-test-model';

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
  answers: string[];

  constructor(private testService: TestService, private route: ActivatedRoute, private router: Router) { }

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
          this.answers = new Array<string>(this.questions.length);
      }, 
        e => {console.log(e.message)});
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
        console.log("yea, success");   
        alert("OK"); //TODO: prompt success
        this.router.navigate(['/home']);
       }, 
      e => {
        console.error(e.message);
        alert("Error");
      });   //TODO: prompt error
  }

}
