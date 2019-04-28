import {Component, OnInit, ViewChild} from '@angular/core';
import { PositionsService } from '../shared/services/positions.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TestPosition} from '../shared/model/position-model';
import {Router} from '@angular/router';
import {MessageService} from '../shared/services/message.service';
@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css']
})
export class PositionsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'active'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  positions: TestPosition[];

  constructor(private positionsService: PositionsService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
   this.updateTable();
  }

  updateTable() {
    this.positionsService.getAll().subscribe(data => {
      this.positions = data.sort((a, b) => a.id - b.id );
      this.dataSource = new MatTableDataSource<TestPosition>(this.positions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onChangeStateClick(position: TestPosition) {
    if (position.active === true) {
      this.positionsService.deactivatePosition(position).subscribe(() => {
        this.updateTable();
        this.messageService.success('position_deactivated');
      });
    } else {
      this.positionsService.activatePosition(position).subscribe(() => {
        this.updateTable();
        this.messageService.success('position_activated');
      });
    }
  }
}
