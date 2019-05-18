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

export interface TestModel {
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

export interface NewTestVersion {
  testId: number;
  languageId: string;
  test: NewTestModel;
}

export interface NewTestModel {
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

export interface QuestionModel {
    question: string;
}

export interface OpenQuestionModel extends QuestionModel {}

export interface ChoiceQuestionModel extends QuestionModel {
    answers: string[];
}
export interface ScaleQuestionModel extends QuestionModel {
    answers: number[];
}
export interface NumericQuestionModel extends QuestionModel {}
