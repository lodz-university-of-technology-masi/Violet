import { Component, OnInit } from '@angular/core';
import {PositionsService} from '../shared/positions/positions.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.css']
})
export class PositionEditComponent implements OnInit {
  position: any = {};
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private positionsService: PositionsService,
  ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.positionsService.get(id).subscribe((position: any) => {
          if (position) {
            this.position = position;
            this.position.href = position._links.self.href;
           // this.giphyService.get(position.name).subscribe(url => position.giphyUrl = url);
          } else {
            console.log(`Position with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/positions-list']);
  }
  remove(href) {
    this.positionsService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
