import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestPosition} from '../shared/model/position-model';
import {PositionsService} from '../shared/services/positions.service';
import {Router} from '@angular/router';
import {RedactorModel} from '../shared/model/redactor-model';
import {RedactorService} from '../shared/services/redactor.service';

@Component({
  selector: 'app-redactor-list',
  templateUrl: './redactor-list.component.html',
  styleUrls: ['./redactor-list.component.css']
})
export class RedactorListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  redactors: RedactorModel[];

  constructor(private redactorService: RedactorService, private router: Router) { }
  ngOnInit() {
    this.updateTable();
  }

  updateTable() {

      this.redactorService.getAll().subscribe(data => {
      this.redactors = data.sort((a, b) => a.id - b.id );
      this.dataSource = new MatTableDataSource<RedactorModel>(this.redactors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
