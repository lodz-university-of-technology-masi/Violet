import { Component, OnInit } from '@angular/core';
import {MarkResolveTestAnswers, QuestionModel, TestMarks} from '../shared/model/test-model';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../shared/services/test.service';
import {CandidateService} from '../shared/services/candidate.service';
import {MessageService} from '../shared/services/message.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-resolve-test-mark',
  templateUrl: './resolve-test-mark.component.html',
  styleUrls: ['./resolve-test-mark.component.css']
})
export class ResolveTestMarkComponent implements OnInit {
  testId: number;
  testName: string;
  questions: QuestionModel[] = [];
  answer: MarkResolveTestAnswers;
  testMarks: TestMarks = {
    id: '',
    mark: []
  };

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService,
              private candidateService: CandidateService, private messageService: MessageService, private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.testMarks.id = params.get('testId');
      this.testId = Number(this.testMarks.id);
    });
    this.testService.getResolvedTest(this.testId).subscribe(data => {
      this.testName = data.test.name;
      this.questions = this.questions
        .concat(data.test.choiceQuestions)
        .concat(data.test.numericQuestions)
        .concat(data.test.openQuestions)
        .concat(data.test.scaleQuestions);
      this.answer = data.answer;
    });
  }

  markTest() {
    console.log(this.testMarks.mark);
    console.log(JSON.stringify(this.testMarks));
    this.testService.markResolvedTest(JSON.stringify(this.testMarks)).subscribe(() => {
      this.messageService.success('Test has been marked.');
      this.location.back();
    });
  }
}
