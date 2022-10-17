import { SetStateAction } from "react";
import { QuestionType } from "./QuestionType";

export type QuestionContextType = {
  questions: QuestionType[] | null;
  setQuestions: React.Dispatch<SetStateAction<QuestionType[] | null>>;
};
