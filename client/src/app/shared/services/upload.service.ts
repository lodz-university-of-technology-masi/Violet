import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) {
  }

  uploadScreenshot(formData: FormData) {
    return this.http.post(`${this.API}/metric/upload/screenshot`, formData);
  }
}
