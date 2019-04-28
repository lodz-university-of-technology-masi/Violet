import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';
import {RedactorModel} from '../model/redactor-model';

@Injectable()
export class RedactorService {

  private API = this.config.Server;
  constructor(private http: HttpClient, private config: Configuration) {
  }

  public getAll() {
    return this.http.get<RedactorModel[]>(this.API + '/user/redactor');
  }

}
