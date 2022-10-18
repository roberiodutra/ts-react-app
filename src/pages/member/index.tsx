import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../context/providers/QuestionProvider";
import { useUsers } from "../../context/providers/UserProvider";
import QuestionCard from "./components/QuestionCard";
import QuestionForm from "./components/QuestionForm";

export default function Member() {
  const { questions } = useQuestions();
  const { user } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign_in");
    }
  }, [user]);

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
