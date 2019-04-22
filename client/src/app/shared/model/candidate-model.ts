export interface Language {
  id: number;
  name: string;
}

export interface RecruitmentPosition {
  id: number;
  name: string;
}

export interface RegisterCandidate {
  firstName: string;
  lastName: string;
  email: string;
  languageId: number;
  positionId: number;
}

export interface TestVersionEntry {
  id: number;
  testName: string;
  version: number;
  active: boolean;
}

export interface CandidateToken {
  token: string;
}
