import {Component, OnInit, ViewChild} from '@angular/core';
import { PositionsService } from '../shared/positions/positions.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {TestPosition} from '../shared/model/position-model';
import {Router} from '@angular/router';
@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css']
})
export class PositionsListComponent implements OnInit {

  displayedColumns: string[] = ['positionName', 'changeState'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  positions: TestPosition[];

  constructor(private positionsService: PositionsService, private router: Router) { }

  ngOnInit() {
    this.positionsService.getAll().subscribe(data => {
      this.positions = data;
      this.dataSource = new MatTableDataSource<TestPosition>(this.positions);
      this.dataSource.paginator = this.paginator;
    });
  }

  onChangeStateClick(positions) {
    // NOT IMPLEMENTED
  }
}
