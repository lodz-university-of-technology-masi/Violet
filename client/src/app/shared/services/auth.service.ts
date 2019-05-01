import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';
import {Language} from '../model/candidate-model';
import {UserIdentity} from '../model/user-model';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class AuthService {
  private listeners = new Subject<any>();
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) {
  }

  listen(): Observable<any> {
    return this.listeners.asObservable();
  }

  addEvent(message: string) {
    this.listeners.next(message);
  }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('client:secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.API + '/oauth/token', loginPayload, {headers});
  }

  getUserIdentity() {
    return this.http.get<UserIdentity>( `${this.API}/user/identity`);
  }
}
