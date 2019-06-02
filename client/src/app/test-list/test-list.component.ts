import {Component, OnInit, ViewChild, DoCheck, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestListWithVersions, TestVersion, QuestionModel} from '../shared/model/test-model';
import {TestService} from '../shared/services/test.service';
import {Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
import {PositionsService} from '../shared/services/positions.service';
import {TestPosition} from '../shared/model/position-model';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  tests: TestListWithVersions[];

  showDetailedTable = false;

  displayedColumns: string[] = ['id', 'name', 'delete', 'assign', 'choose'];
  displayedColumnsDetailed: string[] = ['id', 'name', 'language', 'modify'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;

  dataSourceDetailed;
  positions: TestPosition[];

  private sortDetailed: MatSort;
  private paginatorDetailed: MatPaginator;

  @ViewChild('detailedTablePaginator') set setPaginatorDetailed(paginatorDetailed: MatPaginator) {
    this.paginatorDetailed = paginatorDetailed;
    this.dataSourceDetailed.paginator = this.paginatorDetailed;
  }

  @ViewChild('detailedTable') set setSortDetailed(sortDetailed: MatSort) {
    this.sortDetailed = sortDetailed;
    this.dataSourceDetailed.sort = this.sortDetailed;
  }

  constructor(private testService: TestService, private router: Router, private messageService: MessageService,
              private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.updateTable();
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
    this.dataSourceDetailed.paginator = this.paginatorDetailed;
    this.dataSourceDetailed.sort = this.sortDetailed;
    this.showDetailedTable = true;
  }

  onDeleteClick(test: TestListWithVersions) {
    this.testService.deleteTest(test.id).subscribe(() => {
      this.messageService.success('test_deleted');
      this.updateTable();
    });
  }

  onModifyClick(test: TestVersion) {
    this.router.navigate(['/test-modify'], {queryParams: {testId: test.id, language: test.languageName}});
  }
  onAssignChange(test: TestVersion, positionId: string) {
    this.testService.assignPosition(positionId, test.id).subscribe(() => {
      this.messageService.success('position_assigned');
    });
  }
}
