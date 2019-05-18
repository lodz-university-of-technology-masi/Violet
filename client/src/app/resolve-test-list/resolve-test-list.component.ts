import {Component, OnInit, ViewChild} from '@angular/core';
import {ResolvedTest} from '../shared/model/test-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestService} from '../shared/services/test.service';
import {Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';

@Component({
  selector: 'app-resolve-test-list',
  templateUrl: './resolve-test-list.component.html',
  styleUrls: ['./resolve-test-list.component.css']
})
export class ResolveTestListComponent implements OnInit {

  tests: ResolvedTest[];

  displayedColumns: string[] = ['id', 'name', 'scored points', 'max points', 'candidate email', 'position', 'language', 'mark'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;

  constructor(private testService: TestService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit() {
    this.updateTable();
  }

  updateTable() {
    this.testService.getCurrentRedactorResolvedTests().subscribe(data => {
      this.tests = data.sort((a, b) => Number(a.id) - Number(b.id));
      this.dataSource = new MatTableDataSource<ResolvedTest>(this.tests);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onMarkClick(test: ResolvedTest) {
    this.router.navigate(['/resolve-test-mark'], {queryParams: {testId: test.id}});
  }
}

