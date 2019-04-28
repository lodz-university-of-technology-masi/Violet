import { Component, OnInit } from '@angular/core';
import {PositionsService} from '../shared/services/positions.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NewTestPosition} from '../shared/model/position-model';
import {MessageService} from '../shared/services/message.service';

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
              private positionsService: PositionsService,
              private messageService: MessageService) {}

  ngOnInit() {
  }

  gotoList() {
    this.router.navigate(['/positions-list']);
  }

  submitForm() {
    this.positionsService.save(this.position).subscribe(() => {
      this.messageService.success('position_added');
      this.gotoList();
    });
  }
}
