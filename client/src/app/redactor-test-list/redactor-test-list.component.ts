import {Component, OnInit, ViewChild} from '@angular/core';
import {TestListWithVersions, TestVersion} from '../shared/model/test-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestService} from '../shared/services/test.service';
import {Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';

@Component({
  selector: 'app-redactor-test-list',
  templateUrl: './redactor-test-list.component.html',
  styleUrls: ['./redactor-test-list.component.css']
})
export class RedactorTestListComponent implements OnInit {

  tests: TestListWithVersions[];

  showDetailedTable = false;

  displayedColumns: string[] = ['id', 'name', 'add', 'delete', 'choose'];
  displayedColumnsDetailed: string[] = ['id', 'name', 'language', 'modify'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;

  @ViewChild(MatPaginator) paginatorDetailed: MatPaginator;
  @ViewChild(MatSort) sortDetailed: MatSort;
  dataSourceDetailed;

  constructor(private testService: TestService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
    console.log('init');
    this.updateTable();

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
      this.showDetailedTable = false;
    });
  }

  onChooseClick(tests: TestListWithVersions) {
    this.dataSourceDetailed = new MatTableDataSource<TestVersion>(tests.testVersions);
    this.dataSourceDetailed.paginator = this.paginator;
    this.dataSourceDetailed.sort = this.sort;
    this.showDetailedTable = true;
  }

  onDeleteClick(test: TestListWithVersions) {
    this.testService.redactorDeleteTest(test.id).subscribe(() => {
      this.messageService.success('test_deleted');
      this.updateTable();
    });
  }

  onModifyClick(test: TestVersion) {
    this.router.navigate(['/test-modify'], {queryParams: {testId: test.id}});
  }

  onAddVersionClick(test: TestListWithVersions) {
    this.router.navigate(['/test-add-version'], {queryParams: {testId: test.id, testVersionId: test.testVersions[0].id}});
  }

  onAddClick() {
    this.router.navigate(['/test-add']);
  }
}
