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

  displayedColumns: string[] = ['id', 'name', 'delete', 'choose'];
  displayedColumnsDetailed: string[] = ['id', 'name', 'active', 'modify'];
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

  onChangeStateClick(test: TestVersion) {
    //TODO: implement

    this.updateTable();
  }

  onDeleteClick(test: TestListWithVersions) {
    this.testService.redactorDeleteTest(test.id).subscribe(() => {
      this.messageService.success('test_deleted');
      this.updateTable();
    });
  }

  onModifyClick(test: TestVersion) {
    //TODO: implement
  }
}
