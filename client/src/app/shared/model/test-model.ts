export interface TestVersionContentModel {
    id: string;
    version: string;
    test: TestModel;
}

export interface TestListWithVersions {
  id: number;
  testVersions: TestVersion[];
}

export interface TestVersion {
  id: string;
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

export interface NewTestModel {
  name: string;
  openQuestions: OpenQuestionModel[];
  choiceQuestions: ChoiceQuestionModel[];
  scaleQuestions: ScaleQuestionModel[];
  numericQuestions: NumericQuestionModel[];
}

export interface ModifiedTest {
  versionId: string;
  test: NewTestModel;
  version: string;
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
