import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { TestVersionContentModel, OpenQuestionModel } from '../model/test-model';

@Injectable()
export class ExportService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) { }
  
  exportPdf(data: any) {
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 10;  
      pdf.addImage(contentDataURL, 'PNG', position, position, imgWidth, imgHeight)  
      pdf.save('export.pdf'); // Generated PDF   
    });
  }

  exportCsv(test: TestVersionContentModel, lang: string) {
    let questions: string [] = [];
    let i: number = 0;
    test.test.openQuestions.forEach(e => {
      i = i + 1;
      questions.push(this.buildQuestionWithoutAnswers(e, i, lang, 'O'));
    });
    test.test.numericQuestions.forEach(e => {
      i = i + 1;
      questions.push(this.buildQuestionWithoutAnswers(e, i, lang, 'L'));
    });
    test.test.choiceQuestions.forEach(e => {
      i = i + 1;
      questions.push(this.buildQuestion(e, i, lang, 'W'));
    });
    test.test.scaleQuestions.forEach(e => {
      i = i + 1;
      questions.push(this.buildQuestion(e, i, lang, 'S'));
    });

    let csv = questions.join('\r\n');
    var blob = new Blob([csv], {type: 'text/csv' });
    saveAs(blob, "export.csv");
  }

  private buildQuestionWithoutAnswers(e: OpenQuestionModel, i: number, lang: string, type: string) : string {
    let line: string = '';
    line = line + i + ';';
    line = line + type + ';'
    line = line + lang + ';';
    line = line + e.question + ';';
    line = line + '1;';
    line = line + '|'
    return line;
  }

  private buildQuestion(e: any, i: number, lang: string, type: string) : string {
    let line: string = '';
    line = line + i + ';';
    line = line + type + ';'
    line = line + lang + ';';
    line = line + e.question + ';';
    line = line + e.answers.length + ';';
    e.answers.forEach(a => {
      line = line + a + '|';
    });
    return line;
  }

}
