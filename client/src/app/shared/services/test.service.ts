import { Injectable, Input } from '@angular/core';
import { Configuration } from '../../configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TestVersionContentModel } from '../model/test-model';

@Injectable()
export class TestService {
    private API = this.config.Server;
    constructor(private http: HttpClient, private config: Configuration) {
    }
    
    getTest(id: string) : Observable<TestVersionContentModel> {
        return this.http.get<TestVersionContentModel>(this.API + '/test/version/' + id);
    }
}
