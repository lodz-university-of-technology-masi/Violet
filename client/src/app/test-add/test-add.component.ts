import {Component, OnInit} from '@angular/core';
import { NewTest, NewTestModel } from '../shared/model/test-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/services/message.service';
import { TestService } from '../shared/services/test.service';
import { Language } from '../shared/model/candidate-model';
import { CandidateService } from '../shared/services/candidate.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportService } from '../shared/services/import.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.css']
})
export class TestAddComponent implements OnInit {
  languages: Language[];
  questionTypes = ['Open question', 'Choice question', 'Scale question', 'Numeric question'];
  questionType: string;
  arrayOfChoiceAnswers: any[];
  arrayOfChoiceAnswersNumber: any[];
  arrayOfScaleAnswers: any[];
  value = '';
  arrayOfScaleAnswersNumber: any[];
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

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService, 
              private candidateService: CandidateService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.arrayOfChoiceAnswers = new Array(new Array(2));
    this.arrayOfChoiceAnswersNumber = new Array(new Array(2));
    this.arrayOfChoiceAnswers[0].fill('');
    this.arrayOfScaleAnswers = new Array(new Array(2));
    this.arrayOfScaleAnswersNumber = new Array(new Array(2));
    this.arrayOfScaleAnswers[0].fill(0);
    this.candidateService.getAllLanguages().subscribe(data => {
      this.languages = data;
    });
    this.testForm = this.formBuilder.group({
      languageId: ['', Validators.required],
      testName: [''],
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
        this.arrayOfChoiceAnswersNumber.push(new Array(2));
        break;
      case 'Scale question':
        this.questions = this.testForm.get('scaleQuestions') as FormArray;
        this.questions.push(this.createChoiceScaleQuestion());
        this.arrayOfScaleAnswers.push([0, 0]);
        this.arrayOfScaleAnswersNumber.push(new Array(2));
        break;
      case 'Numeric question':
        this.questions = this.testForm.get('numericQuestions') as FormArray;
        this.questions.push(this.createOpenNumericQuestion());
        break;
      default:
    }
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
  removeQuestion(type: string, id: number): void {
    switch (type) {
      case 'Open question':
        this.questions = this.testForm.get('openQuestions') as FormArray;
        break;
      case 'Choice question':
        this.questions = this.testForm.get('choiceQuestions') as FormArray;
        this.arrayOfChoiceAnswers.splice(id, 1);
        this.arrayOfChoiceAnswersNumber.splice(id, 1);
        break;
      case 'Scale question':
        this.questions = this.testForm.get('scaleQuestions') as FormArray;
        this.arrayOfScaleAnswers.splice(id, 1);
        this.arrayOfScaleAnswersNumber.splice(id, 1);
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
    this.arrayOfChoiceAnswersNumber[i] = new Array(this.arrayOfChoiceAnswersNumber[i].length + 1);
  }

  removeChoiceAnswerInput(i: number): void {
    this.arrayOfChoiceAnswers[i].pop();
    this.arrayOfChoiceAnswersNumber[i].pop();
  }

  addScaleAnswerInput(i: number): void {
    this.arrayOfScaleAnswers[i].push(0);
    this.arrayOfScaleAnswersNumber[i] = new Array(this.arrayOfScaleAnswersNumber[i].length + 1);
  }

  removeScaleAnswerInput(i: number): void {
    this.arrayOfScaleAnswers[i].pop();
    this.arrayOfScaleAnswersNumber[i].pop();
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

  addTest() {
    this.newTest.languageId = this.testForm.controls.languageId.value;
    this.newTest.test.name = this.testForm.controls.name.value;
    this.newTest.test.openQuestions = this.testForm.controls.openQuestions.value;
    this.newTest.test.choiceQuestions = this.testForm.controls.choiceQuestions.value;
    for (let i = 0; i < this.newTest.test.choiceQuestions.length; i++) {
      this.newTest.test.choiceQuestions[i].answers = this.arrayOfChoiceAnswers[i];
    }
    this.newTest.test.scaleQuestions = this.testForm.controls.scaleQuestions.value;
    for (let i = 0; i < this.newTest.test.scaleQuestions.length; i++) {
      this.newTest.test.scaleQuestions[i].answers = this.arrayOfScaleAnswers[i];
    }
    this.newTest.test.numericQuestions = this.testForm.controls.numericQuestions.value;
    this.testService.addTest(JSON.stringify(this.newTest)).subscribe(() => {
      this.messageService.success('test_added');
      this.router.navigate(['/test-list-redactor']);
    });
  }

  validate(evt) {
    this.testService.validateScale(evt);
  }
}
