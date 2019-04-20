import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PositionsService {
  public API = '//localhost:8081';
  public POSITIONS_API = this.API + '/candidate/positions';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/candidate/positions');
  }
  get(id: string) {
    return this.http.get(this.POSITIONS_API + '/' + id);
  }
  save(position: any): Observable<any> {
    let result: Observable<Object>;
    if (position['href']) {
      result = this.http.put(position.href, position);
    } else {
      result = this.http.post(this.POSITIONS_API, position);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}
