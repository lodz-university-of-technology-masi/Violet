import { Component, OnInit } from '@angular/core';
import { PositionsService } from '../shared/positions/positions.service';
@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css']
})
export class PositionsListComponent implements OnInit {

  positions: Array<any>;

  constructor(private positionsService: PositionsService) { }

  ngOnInit() {
    this.positionsService.getAll().subscribe(data => {
      this.positions = data;
    });
  }

}
