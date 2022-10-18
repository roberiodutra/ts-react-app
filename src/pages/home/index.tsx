import Header from "../../components/Header";
import { useQuestions } from "../../context/providers/QuestionProvider";
import QuestionCard from "../member/components/QuestionCard";

export default function Home() {
  const { questions } = useQuestions();

  return (
    <main>
      <Header />
      {questions
        ?.filter((e) => e.status !== "pending")
        .map((Q, I) => (
          <QuestionCard key={I} data={Q} />
        ))}
    </main>
  );
}
