import { Component, OnInit } from '@angular/core';
import {PositionsService} from '../shared/positions/positions.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NewTestPosition} from '../shared/model/position-model';

@Component({
  selector: 'app-position-add',
  templateUrl: './position-add.component.html',
  styleUrls: ['./position-add.component.css']
})
export class PositionAddComponent implements OnInit {
  position: NewTestPosition = {
    name: ''
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private positionsService: PositionsService) {}

  ngOnInit() {
  }

  gotoList() {
    this.router.navigate(['/positions-list']);
  }

  submitForm() {
    this.positionsService.save(this.position).subscribe(() => {
      this.gotoList();
    });
  }
}