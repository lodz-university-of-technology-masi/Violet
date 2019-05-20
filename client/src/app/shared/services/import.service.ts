import { Injectable } from '@angular/core';
import { TestModel, OpenQuestionModel, ChoiceQuestionModel, ScaleQuestionModel, NumericQuestionModel, NewTestVersion, NewTestModel, NewTest } from '../model/test-model';
import { ParseError } from '../model/parse-error';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor() { }

  parseCsv(e): NewTest {
    var content = e.target.result.split("\n");
    if(content.length === 0)
      throw new ParseError("empty_file", "");
    var version = new NewTest();
    version.languageId = content[0].split(";")[2];
    var test = new NewTestModel();
    version.test = test;
    test.openQuestions = [];
    test.choiceQuestions = [];
    test.numericQuestions = [];
    test.scaleQuestions = [];

    content.forEach(l => {
      var fields = l.split(";");
      this.validateFields(fields);
      switch (fields[1]) {
        case "O":
          test.openQuestions.push(this.parseOpen(fields));
          break;
        case "W":
          test.choiceQuestions.push(this.parseChoice(fields));
          break;
        case "S":
          test.scaleQuestions.push(this.parseScale(fields));
          break;
        case "L":
          test.numericQuestions.push(this.parseNumeric(fields));
          break;
        default:
          throw new ParseError("invalid_type", fields[1]);
      }
    });

    return version;
  }
  validateFields(fields: string[]) {
    if(fields.length != 6)
      throw new ParseError("invalid_line_format", fields[0]);
    if(isNaN(Number.parseInt(fields[0])))
      throw new ParseError("not_a_number", fields[0]);
    if(isNaN(Number.parseInt(fields[4])))
      throw new ParseError("not_a_number", fields[0]);
      if(Number.parseInt(fields[4]) < 1)
        throw new ParseError("no_answers_lt_one", fields[0]);
  }
  parseNumeric(fields: string[]): NumericQuestionModel {
    var q = new NumericQuestionModel();
    q.question = fields[3];
    return q;
  }
  parseScale(fields: string[]): ScaleQuestionModel {
    var q = new ScaleQuestionModel();
    q.question = fields[3];
    q.answers = fields[5].split("|").map(Number);
    return q;
  }
  parseChoice(fields: string[]): ChoiceQuestionModel {
    var q = new ChoiceQuestionModel();
    q.question = fields[3];
    q.answers = fields[5].split("|");
    return q;
  }
  parseOpen(fields: string[]): OpenQuestionModel {
    var q = new OpenQuestionModel();
    q.question = fields[3];
    return q;
  }

}
