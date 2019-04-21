import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {NewTestPosition, TestPosition} from '../model/position-model';
import {Configuration} from '../../configuration';

@Injectable()
export class PositionsService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) {
  }

  getAll() {
    return this.http.get<TestPosition[]>(this.API + '/position/list');
  }

  save(position: NewTestPosition) {
    return this.http.post(this.API + '/position/add', position);
  }
}
