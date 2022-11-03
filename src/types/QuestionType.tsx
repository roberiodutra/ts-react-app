import { IQuestionQ } from "./IQuestionQ";
import { QuestionStatusType } from "./QuestionStatusType";

export interface QuestionType extends IQuestionQ, QuestionStatusType {
  _id: string;
  userId?: string;
  author?: string;
}
