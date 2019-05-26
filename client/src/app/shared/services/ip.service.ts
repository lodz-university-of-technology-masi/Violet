import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Configuration} from '../../configuration';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private API = this.config.Server;
  constructor(private http: HttpClient, private config: Configuration) { }
  getClientIp(): Observable<any> {
    return this.http.get(`${this.API}/user/ip`, {responseType: "text"});
  }
}
