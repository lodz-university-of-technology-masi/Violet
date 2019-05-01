import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestListWithVersions, TestVersion} from '../shared/model/test-model';
import {TestService} from '../shared/services/test.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

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

  constructor(private testService: TestService, private router: Router) {
  }

  ngOnInit() {
    this.updateTable();

  }

  updateTable() {
    this.testService.getAll().subscribe(data => {
      this.tests = data.sort((a, b) => a.id - b.id);
      this.dataSource = new MatTableDataSource<TestListWithVersions>(this.tests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    //TODO: implement

    this.updateTable();
  }

  onModifyClick(test: TestVersion) {
    //TODO: implement
  }
}
