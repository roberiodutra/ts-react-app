import { QuestionType } from "../../../types/QuestionType";

export default function QuestionCard({ data: { question } }: any) {
  return (
    <div>
      <div>{question}</div>
      <button type="button">Publish</button>
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </div>
  );
}
