import { SetStateAction } from "react";
import { IQuestionQ } from "./IQuestionQ";
import { QuestionStatusType } from "./QuestionStatusType";
import { QuestionType } from "./QuestionType";

export type QuestionContextType = {
  questions: QuestionType[];
  setQuestions: React.Dispatch<SetStateAction<QuestionType[]>>;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
  updateQ: (id: string, data: QuestionStatusType | IQuestionQ) => void;
  deleteQ: (id: string) => void;
  memberPage: string;
  setMemberPage: React.Dispatch<SetStateAction<string>>;
};
