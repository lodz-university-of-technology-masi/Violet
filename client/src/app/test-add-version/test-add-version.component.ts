import {Component, OnInit} from '@angular/core';
import {Language} from '../shared/model/candidate-model';
import {NewTestModel, NewTestVersion} from '../shared/model/test-model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../shared/services/test.service';
import {CandidateService} from '../shared/services/candidate.service';
import {MessageService} from '../shared/services/message.service';

@Component({
  selector: 'app-test-add-version',
  templateUrl: './test-add-version.component.html',
  styleUrls: ['./test-add-version.component.css']
})
export class TestAddVersionComponent implements OnInit {
  testId = '';
  languages: Language[];
  arrayOfChoiceAnswers: any[];
  arrayOfScaleAnswers: any[];
  value = '';
  newTestModel: NewTestModel = {
    name: '',
    openQuestions: [],
    choiceQuestions: [],
    scaleQuestions: [],
    numericQuestions: []
  };
  newTestVersion: NewTestVersion = {
    testId: '',
    languageId: '',
    test: this.newTestModel
  };
  testForm: FormGroup;
  questions: FormArray;

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService,
              private candidateService: CandidateService, private messageService: MessageService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.testForm = this.formBuilder.group({
      languageId: ['', Validators.required],
      name: ['', Validators.required],
      openQuestions: this.formBuilder.array([]),
      choiceQuestions: this.formBuilder.array([]),
      scaleQuestions: this.formBuilder.array([]),
      numericQuestions: this.formBuilder.array([])
    });
    this.candidateService.getAllLanguages().subscribe(data => {
      this.languages = data;
    });
    this.route.queryParamMap.subscribe(params => {
      this.testId = params.get('testId');
    });
    this.testService.getTest(this.testId).subscribe(data => {
      this.newTestModel.name = data.test.name;
      this.newTestModel.openQuestions = data.test.openQuestions;
      this.newTestModel.choiceQuestions = data.test.choiceQuestions;
      this.newTestModel.scaleQuestions = data.test.scaleQuestions;
      this.newTestModel.numericQuestions = data.test.numericQuestions;
      this.arrayOfChoiceAnswers = new Array(data.test.choiceQuestions.length);
      this.arrayOfScaleAnswers = new Array(data.test.scaleQuestions.length);
      for (let i = 0; i < data.test.choiceQuestions.length; i++) {
        this.arrayOfChoiceAnswers[i] = new Array(new Array(data.test.choiceQuestions[i].answers.length));
        for (let j = 0; j < data.test.choiceQuestions[i].answers.length; j++) {
          this.arrayOfChoiceAnswers[i][j] = data.test.choiceQuestions[i].answers[j];
        }
        this.arrayOfScaleAnswers[i] = new Array(new Array(data.test.scaleQuestions[i].answers.length));
        for (let j = 0; j < data.test.scaleQuestions[i].answers.length; j++) {
          this.arrayOfScaleAnswers[i][j] = data.test.scaleQuestions[i].answers[j];
        }
      }
      this.testForm.controls.name.setValue(this.newTestModel.name);
      this.newTestModel.openQuestions.forEach(q => {
        this.questions = this.testForm.get('openQuestions') as FormArray;
        this.questions.push(this.formBuilder.group({question: q.question}));
      });
      this.newTestModel.choiceQuestions.forEach(q => {
        this.questions = this.testForm.get('choiceQuestions') as FormArray;
        this.questions.push(this.formBuilder.group({question: q.question}));
      });
      this.newTestModel.scaleQuestions.forEach(q => {
        this.questions = this.testForm.get('scaleQuestions') as FormArray;
        this.questions.push(this.formBuilder.group({question: q.question}));
      });
      this.newTestModel.numericQuestions.forEach(q => {
        this.questions = this.testForm.get('numericQuestions') as FormArray;
        this.questions.push(this.formBuilder.group({question: q.question}));
      });
    });
  }

  onType(value: string) {
    this.value = value;
  }

  openWiki(value: string) {
    window.open('https://en.wikipedia.org/wiki/' + value, '_blank');
  }

  findSynonyms(value: string) {
    window.open('https://www.wordreference.com/synonyms/' + value, '_blank');
  }

  addChoiceAnswerInput(i: number): void {
    this.arrayOfChoiceAnswers[i].push('');
  }

  removeChoiceAnswerInput(i: number): void {
    this.arrayOfChoiceAnswers[i].pop();
  }

  addScaleAnswerInput(i: number): void {
    this.arrayOfScaleAnswers[i].push('');
  }

  removeScaleAnswerInput(i: number): void {
    this.arrayOfScaleAnswers[i].pop();
  }

  addChoiceAnswer(i: number, j: number, value: string): void {
    this.arrayOfChoiceAnswers[i][j] = value;
  }

  addScaleAnswer(i: number, j: number, value: string): void {
    this.arrayOfScaleAnswers[i][j] = value;
  }

  addTest() {
    this.newTestVersion.testId = this.testId;
    this.newTestVersion.languageId = this.testForm.controls.languageId.value.toString();
    this.newTestVersion.test.name = this.testForm.controls.name.value;
    this.newTestVersion.test.openQuestions = this.testForm.controls.openQuestions.value;
    this.newTestVersion.test.choiceQuestions = this.testForm.controls.choiceQuestions.value;
    for (let i = 0; i < this.newTestVersion.test.choiceQuestions.length; i++) {
      this.newTestVersion.test.choiceQuestions[i].answers = this.arrayOfChoiceAnswers[i];
    }
    this.newTestVersion.test.scaleQuestions = this.testForm.controls.scaleQuestions.value;
    for (let i = 0; i < this.newTestVersion.test.scaleQuestions.length; i++) {
      this.newTestVersion.test.scaleQuestions[i].answers = this.arrayOfScaleAnswers[i];
    }
    this.newTestVersion.test.numericQuestions = this.testForm.controls.numericQuestions.value;
    this.testService.addTestVersion(JSON.stringify(this.newTestVersion)).subscribe(() => {
      this.messageService.success('Test version has been added.');
      this.router.navigate(['/test-list-redactor']);
    });
  }
}
