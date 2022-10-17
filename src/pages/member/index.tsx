import { useQuestions } from "../../context/providers/QuestionProvider";
import QuestionForm from "./components/QuestionForm";

export default function Member() {
  const { questions } = useQuestions();
  return (
    <main>
      <QuestionForm />
      {questions?.map((Q, I) => (
        <div key={I}>
          <div>{Q.question}</div>
          <div>{Q.answer}</div>
        </div>
      ))}
    </main>
  );
}
