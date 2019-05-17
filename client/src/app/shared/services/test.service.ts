import {Injectable, Input} from '@angular/core';
import {Configuration} from '../../configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarkResolveTest, ResolvedTest, TestListWithVersions, TestVersionContentModel} from '../model/test-model';
import {ResolveTestModel} from '../model/resolve-test-model';

@Injectable()
export class TestService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) {
  }

  getTest(id: number): Observable<TestVersionContentModel> {
    return this.http.get<TestVersionContentModel>(this.API + '/test/version/' + id);
  }

  getResolvedTest(id: number): Observable<MarkResolveTest> {
    return this.http.get<MarkResolveTest>(this.API + '/redactor/test/resolved/' + id);
  }

  resolveTest(model: ResolveTestModel): Observable<object> {
    return this.http.post<object>(this.API + '/candidate/resolved/test', model);
  }

  public getAll() {
    return this.http.get<TestListWithVersions[]>(this.API + '/moderator/list/test');
  }

  public deleteTest(id: number) {
    return this.http.delete(`${this.API}/moderator/test/${id}`);
  }

  public redactorDeleteTest(id: number) {
    return this.http.delete(`${this.API}/redactor/test/${id}`);
  }

  public getCurrentRedactorTests() {
    return this.http.get<TestListWithVersions[]>(`${this.API}/redactor/list/test`);
  }

  public addTest(newTest: string) {
    const headers = {'Content-type': 'application/json'};
    return this.http.post(`${this.API}/redactor/test/add`, newTest, {headers});
  }

  public assignPosition(positionId: string, testId: number) {
    return this.http.put(`${this.API}/moderator/test/assign?positionId=${positionId}&testId=${testId}`, null);
  }

  public modifyTest(modifiedTest: string) {
    const headers = {'Content-type': 'application/json'};
    return this.http.put(`${this.API}/moderator/test`, modifiedTest, {headers});
  }

  public getCurrentRedactorResolvedTests() {
    return this.http.get<ResolvedTest[]>(`${this.API}/redactor/list/test/resolved`);
  }

  public translateTestVersion(id: number, targetLang: string) {
    return this.http.put(`${this.API}/redactor/test/version/translate/${id}?targetLang=${targetLang}`, null);
  }

  public addTestVersion(newTestVersion: string) {
    const headers = {'Content-type': 'application/json'};
    return this.http.post(`${this.API}/redactor/test/version/add`, newTestVersion, {headers});
  }

  public markResolvedTest(testMarks: string) {
    const headers = {'Content-type': 'application/json'};
    return this.http.put(`${this.API}/redactor/test/resolved/mark`, testMarks, {headers});
  }
}
