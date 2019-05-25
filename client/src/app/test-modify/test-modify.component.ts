import {Component, OnInit} from '@angular/core';
import {ModifiedTest, NewTest, NewTestModel} from '../shared/model/test-model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService} from '../shared/services/test.service';
import {CandidateService} from '../shared/services/candidate.service';
import {MessageService} from '../shared/services/message.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-test-modify',
  templateUrl: './test-modify.component.html',
  styleUrls: ['./test-modify.component.css']
})
export class TestModifyComponent implements OnInit {
  testId: number;
  newTestModel: NewTestModel = {
    name: '',
    openQuestions: [],
    choiceQuestions: [],
    scaleQuestions: [],
    numericQuestions: []
  };
  modifiedTest: ModifiedTest = {
    versionId: '',
    test: this.newTestModel,
    version: ''
  };
  questionTypes = ['Open question', 'Choice question', 'Scale question', 'Numeric question'];
  questionType: string;
  arrayOfChoiceAnswers: any[];
  arrayOfScaleAnswers: any[];
  testForm: FormGroup;
  questions: FormArray;
  value = '';
  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService,
              private candidateService: CandidateService, private messageService: MessageService, private formBuilder: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.testForm = this.formBuilder.group({
      name: ['', Validators.required],
      openQuestions: this.formBuilder.array([]),
      choiceQuestions: this.formBuilder.array([]),
      scaleQuestions: this.formBuilder.array([]),
      numericQuestions: this.formBuilder.array([])
    });
    this.route.queryParamMap.subscribe(params => {
      this.testId = Number(params.get('testId'));
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
      }
      for (let i = 0; i < data.test.scaleQuestions.length; i++) {
        this.arrayOfScaleAnswers[i] = new Array(new Array(data.test.scaleQuestions[i].answers.length));
        for (let j = 0; j < data.test.scaleQuestions[i].answers.length; j++) {
          this.arrayOfScaleAnswers[i][j] = data.test.scaleQuestions[i].answers[j];
        }
      }
      this.modifiedTest.versionId = data.id;
      this.modifiedTest.version = '0';
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

  createOpenNumericQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ''
    });
  }

  createChoiceScaleQuestion(): FormGroup {
    return this.formBuilder.group({
      question: '',
      answers: []
    });
  }

  addQuestion(type: string): void {
    switch (type) {
      case 'Open question':
        this.questions = this.testForm.get('openQuestions') as FormArray;
        this.questions.push(this.createOpenNumericQuestion());
        break;
      case 'Choice question':
        this.questions = this.testForm.get('choiceQuestions') as FormArray;
        this.questions.push(this.createChoiceScaleQuestion());
        this.arrayOfChoiceAnswers.push(['', '']);
        break;
      case 'Scale question':
        this.questions = this.testForm.get('scaleQuestions') as FormArray;
        this.questions.push(this.createChoiceScaleQuestion());
        this.arrayOfScaleAnswers.push([0, 0]);
        break;
      case 'Numeric question':
        this.questions = this.testForm.get('numericQuestions') as FormArray;
        this.questions.push(this.createOpenNumericQuestion());
        break;
      default:
    }
  }

  removeQuestion(type: string, id: number): void {
    switch (type) {
      case 'Open question':
        this.questions = this.testForm.get('openQuestions') as FormArray;
        break;
      case 'Choice question':
        this.questions = this.testForm.get('choiceQuestions') as FormArray;
        this.arrayOfChoiceAnswers.splice(id, 1);
        break;
      case 'Scale question':
        this.questions = this.testForm.get('scaleQuestions') as FormArray;
        this.arrayOfScaleAnswers.splice(id, 1);
        break;
      case 'Numeric question':
        this.questions = this.testForm.get('numericQuestions') as FormArray;
        break;
      default:
    }
    this.questions.removeAt(id);
  }

  addChoiceAnswerInput(i: number): void {
    this.arrayOfChoiceAnswers[i].push('');
  }

  removeChoiceAnswerInput(i: number): void {
    this.arrayOfChoiceAnswers[i].pop();
  }

  addScaleAnswerInput(i: number): void {
    this.arrayOfScaleAnswers[i].push(0);
  }

  removeScaleAnswerInput(i: number): void {
    this.arrayOfScaleAnswers[i].pop();
  }

  addChoiceAnswer(i: number, j: number, value: string): void {
    this.arrayOfChoiceAnswers[i][j] = value;
  }

  addScaleAnswer(i: number, j: number, value: string): void {
    if (value === '' || value === undefined) {
      this.arrayOfScaleAnswers[i][j] = '0';
    } else {
      this.arrayOfScaleAnswers[i][j] = value;
    }
  }

  setQuestionType(type: string): void {
    this.questionType = type;
  }

  modifyTest() {
    this.modifiedTest.test.name = this.testForm.controls.name.value;
    this.modifiedTest.test.openQuestions = this.testForm.controls.openQuestions.value;
    this.modifiedTest.test.choiceQuestions = this.testForm.controls.choiceQuestions.value;
    for (let i = 0; i < this.modifiedTest.test.choiceQuestions.length; i++) {
      this.modifiedTest.test.choiceQuestions[i].answers = this.arrayOfChoiceAnswers[i];
    }
    this.modifiedTest.test.scaleQuestions = this.testForm.controls.scaleQuestions.value;
    for (let i = 0; i < this.modifiedTest.test.scaleQuestions.length; i++) {
      this.modifiedTest.test.scaleQuestions[i].answers = this.arrayOfScaleAnswers[i];
    }
    this.modifiedTest.test.numericQuestions = this.testForm.controls.numericQuestions.value;
    this.testService.modifyTest(JSON.stringify(this.modifiedTest)).subscribe(() => {
      this.messageService.success('Test has been modified.');
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }

  validate(evt) {
    this.testService.validateScale(evt);
  }
  openWiki(value: string) {
    window.open('https://en.wikipedia.org/wiki/' + value, '_blank');
  }
  findSynonyms(value: string) {
    window.open('https://www.wordreference.com/synonyms/' + value, '_blank');
  }
}
