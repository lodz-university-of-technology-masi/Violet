import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RedactorModel} from '../shared/model/redactor-model';
import {TestModel} from '../shared/model/test-model';
import {TestService} from '../shared/services/test.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ]
})
export class TestListComponent implements OnInit {
  displayedColumns: string[] = ['id'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tests: TestModel[];

  expandedElement: Array<string>;

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow')

  constructor(private testService: TestService, private router: Router) { }
  ngOnInit() {
    this.updateTable();

  }

  updateTable() {

    this.testService.getAll().subscribe(data => {
      this.tests = data.sort((a, b) => a.id - b.id );
      this.dataSource = new MatTableDataSource<TestModel>(this.tests);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  toggleRow(row) {
    console.log('expend/hide');
    console.log(this.expandedElement);
    if (this.expandedElement === row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
    }
  }

}
