import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';

@Injectable()
export class MetricService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) {
  }

  importMetric(metric: string) {
    const headers = {'Content-type': 'application/json'};
    return this.http.post(`${this.API}/metric/add`, metric, {headers});
  }
}
