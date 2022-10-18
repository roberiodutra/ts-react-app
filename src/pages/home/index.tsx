import { useQuestions } from "../../context/providers/QuestionProvider";
import QuestionCard from "../member/components/QuestionCard";

export default function Home() {
  const { questions } = useQuestions();

  return (
    <main>
      {questions
        ?.filter((e) => e.status !== "pending")
        .map((Q, I) => (
          <QuestionCard key={I} data={Q} />
        ))}
    </main>
  );
}
