import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  getClientIp(): Observable<string> {
    return this.http.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK', {responseType: 'text'});
  }
}
