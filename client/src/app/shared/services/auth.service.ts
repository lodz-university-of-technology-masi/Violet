import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../configuration';

@Injectable()
export class AuthService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) { }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('client:secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.API + '/oauth/token', loginPayload, {headers});
  }
}
