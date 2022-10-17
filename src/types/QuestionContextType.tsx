import { SetStateAction } from "react";
import { QuestionType } from "./QuestionType";

export type QuestionContextType = {
  questions: QuestionType[];
  setQuestions: React.Dispatch<SetStateAction<QuestionType[]>>;
};
