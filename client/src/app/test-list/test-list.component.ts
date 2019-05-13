import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestListWithVersions, TestVersion, TestVersionContentModel, QuestionModel} from '../shared/model/test-model';
import {TestService} from '../shared/services/test.service';
import {Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
import {ExportService} from '../shared/services/export.service';
import {PositionsService} from '../shared/services/positions.service';
import {TestPosition} from '../shared/model/position-model';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit, DoCheck {

  tests: TestListWithVersions[];
  questions: QuestionModel[] = [];
  private triggerExport = false;

  showDetailedTable = false;

  displayedColumns: string[] = ['id', 'name', 'delete', 'assign', 'choose'];
  displayedColumnsDetailed: string[] = ['id', 'name', 'language', 'modify', 'export'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;

  @ViewChild(MatPaginator) paginatorDetailed: MatPaginator;
  @ViewChild(MatSort) sortDetailed: MatSort;
  dataSourceDetailed;
  positions: TestPosition[];

  constructor(private testService: TestService, private router: Router, private messageService: MessageService,
              private exportService: ExportService, private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.updateTable();
  }

  ngDoCheck(): void {
    if(this.triggerExport) {
      this.triggerExport = false;
      this.exportPdf();
    }
  }

  updateTable() {
    this.testService.getAll().subscribe(data => {
      this.tests = data.sort((a, b) => a.id - b.id);
      for (let i = 0; i < this.tests.length; i++) {
        this.tests[i].testVersions.sort((a, b) => a.id - b.id);
      }
      this.dataSource = new MatTableDataSource<TestListWithVersions>(this.tests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showDetailedTable = false;
    });
    this.positionsService.getAll().subscribe(data => {
      this.positions = data.sort((a, b) => a.id - b.id );
    });
  }

  onChooseClick(tests: TestListWithVersions) {
    this.dataSourceDetailed = new MatTableDataSource<TestVersion>(tests.testVersions);
    this.dataSourceDetailed.paginator = this.paginator;
    this.dataSourceDetailed.sort = this.sort;
    this.showDetailedTable = true;
  }

  onDeleteClick(test: TestListWithVersions) {
    this.testService.deleteTest(test.id).subscribe(() => {
      this.messageService.success('test_deleted');
      this.updateTable();
    });
  }

  onModifyClick(test: TestVersion) {
    this.router.navigate(['/test-modify'], {queryParams: {testId: test.id}});
  }

  onCsvExportClick(test: TestVersion) {
    this.testService.getTest(test.id).subscribe(t => {
      this.exportService.exportCsv(t, test.languageName);
    });
  }

  onAddClick() {
    this.router.navigate(['/test-add']);
  }

  onAssignChange(test: TestVersion, positionId: string) {
    this.testService.assignPosition(positionId, test.id).subscribe(() => {
      this.messageService.success('Position assigned');
    });
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
}
