import { Component, OnInit } from '@angular/core';
import { ParseError } from '../shared/model/parse-error';
import { ImportService } from '../shared/services/import.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../shared/services/message.service';
import { CandidateService } from '../shared/services/candidate.service';
import { TestService } from '../shared/services/test.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-import',
  templateUrl: './test-import.component.html',
  styleUrls: ['./test-import.component.css']
})
export class TestImportComponent implements OnInit {

  file: any;
  testForm: FormGroup;
  
  constructor(private importService: ImportService, private translateService: TranslateService, private messageService: MessageService, private testService: TestService, 
    private candidateService: CandidateService,  private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.testForm = this.formBuilder.group({
      testName: ['']
    });
  }

  fileChanged(e) {
    this.file = e;
  }
  importCsv() {
    var file = this.file.target.files[0];

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      try {
        var test = this.importService.parseCsv(e);

        this.candidateService.getAllLanguages().subscribe(l => {
          test.languageId = l.find(l => l.name == test.languageId).id.toString();
          test.test.name = this.testForm.get('testName').value;
          this.testService.addTest(JSON.stringify(test)).subscribe(() => {
            this.messageService.success('Test has been added.');
            this.router.navigate(['/test-list-redactor']);
          });
        });
      } catch (error) {
        let e: ParseError = error;
        this.translateService.get(e.message).subscribe(m => this.messageService.error(m + ' ' + e.value));
        return;
      }
    }
    fileReader.readAsText(file);
  }
}
