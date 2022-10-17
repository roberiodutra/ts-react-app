import { useQuestions } from "../../context/providers/QuestionProvider";
import QuestionCard from "../member/components/QuestionCard";
import QuestionForm from "../member/components/QuestionForm";

export default function Admin() {
  const { questions } = useQuestions();
  return (
    <main>
      <QuestionForm />
      {questions
        ?.filter((e) => e.status === "pending")
        .map((Q, I) => (
          <QuestionCard key={I} data={Q} />
        ))}
    </main>
  );
}
