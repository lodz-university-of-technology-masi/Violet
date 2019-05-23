import {Component, OnInit, ViewChild, ViewChildren, DoCheck} from '@angular/core';
import {TestListWithVersions, TestVersion, QuestionModel} from '../shared/model/test-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestService} from '../shared/services/test.service';
import {Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
import { ExportService } from '../shared/services/export.service';

@Component({
  selector: 'app-redactor-test-list',
  templateUrl: './redactor-test-list.component.html',
  styleUrls: ['./redactor-test-list.component.css']
})
export class RedactorTestListComponent implements OnInit, DoCheck {

  tests: TestListWithVersions[];
  private triggerExport = false;
  questions: QuestionModel[] = [];

  showDetailedTable = false;

  displayedColumns: string[] = ['id', 'name', 'add', 'delete', 'choose'];
  displayedColumnsDetailed: string[] = ['id', 'name', 'language', 'modify', 'translate', 'export'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;

  @ViewChild(MatPaginator) paginatorDetailed: MatPaginator;
  @ViewChild(MatSort) sortDetailed: MatSort;
  dataSourceDetailed;

  constructor(private testService: TestService, private router: Router, private messageService: MessageService, private exportService: ExportService) {
  }

  ngOnInit() {
    console.log('init');
    this.updateTable();
    this.showDetailedTable = false;

  }

  ngDoCheck(): void {
    if(this.triggerExport) {
      this.triggerExport = false;
      this.exportPdf();
    }
  }

  updateTable() {
    this.testService.getCurrentRedactorTests().subscribe(data => {
      this.tests = data.sort((a, b) => a.id - b.id);
      for (let i = 0; i < this.tests.length; i++) {
        this.tests[i].testVersions.sort((a, b) => a.id - b.id);
      }
      this.dataSource = new MatTableDataSource<TestListWithVersions>(this.tests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onChooseClick(tests: TestListWithVersions) {
    this.updateTable();
    this.dataSourceDetailed = new MatTableDataSource<TestVersion>(tests.testVersions);
    this.dataSourceDetailed.paginator = this.paginator;
    this.dataSourceDetailed.sort = this.sort;
    this.showDetailedTable = true;
  }

  onDeleteClick(test: TestListWithVersions) {
    this.testService.redactorDeleteTest(test.id).subscribe(() => {
      this.messageService.success('test_deleted');
      this.updateTable();
      this.showDetailedTable = false;
    });
  }

  onModifyClick(test: TestVersion) {
    this.router.navigate(['/test-modify-redactor'], {queryParams: {testId: test.id}});
  }

  onAddVersionClick(test: TestListWithVersions) {
    this.router.navigate(['/test-add-version'], {queryParams: {testId: test.id, testVersionId: test.testVersions[0].id}});
  }

  onAddClick() {
    this.router.navigate(['/test-add']);
  }

  onTranslateClick(tests: TestVersion) {
    const targetLang = (tests.languageName === 'polish' ? 'en' : 'pl');
    this.testService.translateTestVersion(tests.id, targetLang).subscribe(() => {
        this.messageService.success('test_version_translate_started');
      }
    );
  }

  onPdfExportClick(test: TestVersion) {
    this.testService.getTest(test.id).subscribe(t => {
      this.questions = this.questions
      .concat(t.test.choiceQuestions)
      .concat(t.test.numericQuestions)
      .concat(t.test.openQuestions)
      .concat(t.test.scaleQuestions);
      this.triggerExport = true;
      });
  }

  exportPdf() {
    var data = document.getElementById('export-container');
    this.exportService.exportPdf(data);
  }

  onCsvExportClick(test: TestVersion) {
    this.testService.getTest(test.id).subscribe(t => {
      this.exportService.exportCsv(t, test.languageName);
    });
  }

}
