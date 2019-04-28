import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';
import {NewRedactor, RedactorModel} from '../model/redactor-model';

@Injectable()
export class RedactorService {

  private API = this.config.Server;
  constructor(private http: HttpClient, private config: Configuration) {
  }

  public getAll() {
    return this.http.get<RedactorModel[]>(this.API + '/user/redactor');
  }

  save(redactor: NewRedactor) {
    return this.http.post(this.API + '/user/redactor/add', redactor);
  }
}
