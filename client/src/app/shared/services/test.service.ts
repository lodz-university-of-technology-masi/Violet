import {Injectable, Input} from '@angular/core';
import {Configuration} from '../../configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TestListWithVersions, TestModel, TestVersionContentModel} from '../model/test-model';
import {ResolveTestModel} from '../model/resolve-test-model';

@Injectable()
export class TestService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) {
  }

  getTest(id: string): Observable<TestVersionContentModel> {
    return this.http.get<TestVersionContentModel>(this.API + '/test/version/' + id);
  }

  resolveTest(model: ResolveTestModel): Observable<object> {
    return this.http.post<object>(this.API + '/candidate/resolved/test', model);
  }
  public getAll() {
    return this.http.get<TestListWithVersions[]>(this.API + '/moderator/list/test');
  }
}
