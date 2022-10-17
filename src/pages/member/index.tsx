import { useQuestions } from "../../context/providers/QuestionProvider";
import { useUsers } from "../../context/providers/UserProvider";
import QuestionCard from "./components/QuestionCard";
import QuestionForm from "./components/QuestionForm";

export default function Member() {
  const { questions } = useQuestions();
  const { user } = useUsers();
  return (
    <main>
      <QuestionForm />
      {questions
        ?.filter((e) => e.userId === user?.id)
        .map((Q, I) => (
          <QuestionCard key={I} data={Q} />
        ))}
    </main>
  );
}
