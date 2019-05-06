import {Component, NgModule, OnInit} from '@angular/core';
import {NewTest, NewTestModel} from '../shared/model/test-model';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
import {TestService} from '../shared/services/test.service';
import {Language} from '../shared/model/candidate-model';
import {CandidateService} from '../shared/services/candidate.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})
export class TestAddComponent implements OnInit {
  languages: Language[];
  choiceId: 0;
  questionTypes = ['Open question', 'Choice question', 'Scale question', 'Numeric question'];
  questionType: string;
  arrayOfAnswers: any[];
  newTestModel: NewTestModel = {
    name: '',
    openQuestions: [],
    choiceQuestions: [],
    scaleQuestions: [],
    numericQuestions: []
  };
  newTest: NewTest = {
    languageId: '',
    test: this.newTestModel
  };
  testForm: FormGroup;
  questions: FormArray;
  choiceAnswers: FormArray;
  scaleAnswers: FormArray;

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService,
              private candidateService: CandidateService, private messageService: MessageService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.arrayOfAnswers = new Array(2);
    this.candidateService.getAllLanguages().subscribe(data => {
      this.languages = data;
    });
    this.testForm = this.formBuilder.group({
      languageId: ['', Validators.required],
      name: ['', Validators.required],
      openQuestions: this.formBuilder.array([this.createOpenNumericQuestion()]),
      choiceQuestions: this.formBuilder.array([this.createChoiceScaleQuestion()]),
      scaleQuestions: this.formBuilder.array([this.createChoiceScaleQuestion()]),
      numericQuestions: this.formBuilder.array([this.createOpenNumericQuestion()])
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
      answers: this.formBuilder.array([this.createAnswer()])
    });
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      answer: ''
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
        break;
      case 'Scale question':
        this.questions = this.testForm.get('scaleQuestions') as FormArray;
        this.questions.push(this.createChoiceScaleQuestion());
        break;
      case 'Numeric question':
        this.questions = this.testForm.get('numericQuestions') as FormArray;
        this.questions.push(this.createOpenNumericQuestion());
        break;
      default:
    }
    this.choiceId++;
  }

  addAnswer(id: number): void {
    // this.arrayOfAnswers = new Array(this.arrayOfAnswers.length + 1);
    this.choiceAnswers = this.testForm.get('choiceQuestions').controls[id].get('answers') as FormArray;
    console.log(this.testForm.get('choiceQuestions').controls[id].get('answers') as FormArray);
    console.log(id);
    this.choiceAnswers.push(this.createAnswer());
  }

  setQuestionType(type: string): void {
    this.questionType = type;
  }

  addTest() {
    this.newTest.languageId = this.testForm.controls.languageId.value;
    this.newTest.test.name = this.testForm.controls.name.value;
    this.newTest.test.openQuestions = this.testForm.controls.openQuestions.value;
    this.newTest.test.choiceQuestions = this.testForm.controls.choiceQuestions.value;
    this.newTest.test.scaleQuestions = this.testForm.controls.scaleQuestions.value;
    this.newTest.test.numericQuestions = this.testForm.controls.numericQuestions.value;
    console.log(JSON.stringify(this.newTest).replace(null, '[]').replace(null, '[]'));
    this.testService.addTest(JSON.stringify(this.newTest).replace(null, '[]').replace(null, '[]')).subscribe(() => {
      this.messageService.success('Test has been added.');
      this.router.navigate(['/test-list']);
    });
  }
}
