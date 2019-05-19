export interface TestVersionContentModel {
    id: string;
    version: string;
    test: TestModel;
}

export interface TestListWithVersions {
  id: number;
  positionId: number;
  testVersions: TestVersion[];
}

export interface TestVersion {
  id: number;
  testName: string;
  version: number;
  active: boolean;
  languageName: string;
}

export class TestModel {
    name: string;
    id: number;
    openQuestions: OpenQuestionModel[];
    choiceQuestions: ChoiceQuestionModel[];
    scaleQuestions: ScaleQuestionModel[];
    numericQuestions: NumericQuestionModel[];
}

export interface NewTest {
  languageId: string;
  test: NewTestModel;
}

export class NewTestVersion {
  testId: number;
  languageId: string;
  test: NewTestModel;
}

export class NewTestModel {
  name: string;
  openQuestions: OpenQuestionModel[];
  choiceQuestions: ChoiceQuestionModel[];
  scaleQuestions: ScaleQuestionModel[];
  numericQuestions: NumericQuestionModel[];
}

export interface MarkResolveTestAnswers {
  testAnswers: string[];
}

export interface MarkResolveTest {
  id: string;
  test: NewTestModel;
  answer: MarkResolveTestAnswers;
  pointsMax: string;
  version: string;
}

export interface TestMarks {
  id: string;
  mark: number[];
}

export interface ModifiedTest {
  versionId: string;
  test: NewTestModel;
  version: string;
}

export interface ResolvedTest {
  id: string;
  testName: string;
  pointsSum: string;
  pointsMax: string;
  version: string;
  candidateByCandidateIdEmail: string;
  positionByPositionIdName: string;
  languageByLanguageIdName: string;
}

export class QuestionModel {
    question: string;
}

export class OpenQuestionModel extends QuestionModel {}

export class ChoiceQuestionModel extends QuestionModel {
    answers: string[];
}
export class ScaleQuestionModel extends QuestionModel {
    answers: number[];
}
export class NumericQuestionModel extends QuestionModel {}
