import { SetStateAction } from "react";
import { QuestionStatusType } from "./QuestionStatusType";
import { QuestionType } from "./QuestionType";

export type QuestionContextType = {
  questions: QuestionType[];
  setQuestions: React.Dispatch<SetStateAction<QuestionType[]>>;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  publishQ: (id: string, data: QuestionStatusType) => void;
};
