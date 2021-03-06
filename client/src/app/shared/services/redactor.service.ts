import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';
import {NewRedactor, RedactorModel} from '../model/redactor-model';
import {Observable} from 'rxjs/internal/Observable';

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

  deleteRedactor(id: number) {
    return this.http.delete( `${this.API}/user/redactor/${id}`);
  }

  getRedactor(id: number) : Observable<RedactorModel> {
    return this.http.get<RedactorModel>(`${this.API}/user/redactor/${id}`);
  }

  editRedactor(id: number, redactor: RedactorModel) {
    return this.http.put(`${this.API}/user/redactor/${id}`, redactor);
  }
}
