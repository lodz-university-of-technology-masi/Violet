export interface TestVersionContentModel {
    id: string;
    version: string;
    test: TestModel;
  }

export interface TestModel {
    name: string;
    openQuestions: OpenQuestionModel[];
    choiceQuestions: ChoiceQuestionModel[];
    scaleQuestions: ScaleQuestionModel[];
    numericQuestions: NumericQuestionModel[];
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