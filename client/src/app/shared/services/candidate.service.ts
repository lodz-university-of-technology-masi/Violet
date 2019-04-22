import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../../configuration';
import {CandidateToken, Language, RecruitmentPosition, RegisterCandidate, TestVersionEntry} from '../model/candidate-model';

@Injectable()
export class CandidateService {
  private API = this.config.Server;

  constructor(private http: HttpClient, private config: Configuration) { }

  getAllLanguages() {
    return this.http.get<Language[]>(this.API + '/language/list');
  }

  getAllPositions() {
    return this.http.get<RecruitmentPosition[]>(this.API + '/candidate/positions');
  }

  getTestVersionList(positionId: number, languageId: number) {
    return this.http.get<TestVersionEntry[]>(`${this.API}/candidate/list/test?positionId=${positionId}&languageId=${languageId}`);
  }

  registerCandidate(candidate: RegisterCandidate) {
    return this.http.post<CandidateToken>(`${this.API}/candidate/register`, candidate);
  }


}
