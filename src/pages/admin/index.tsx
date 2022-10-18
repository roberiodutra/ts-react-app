import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../context/providers/QuestionProvider";
import { useUsers } from "../../context/providers/UserProvider";
import QuestionCard from "../member/components/QuestionCard";
import QuestionForm from "../member/components/QuestionForm";

export default function Admin() {
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
        ?.filter((e) => e.status === "pending")
        .map((Q, I) => (
          <QuestionCard key={I} data={Q} />
        ))}
    </main>
  );
}
