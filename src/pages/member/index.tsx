import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useQuestions } from "../../context/providers/QuestionProvider";
import { useUsers } from "../../context/providers/UserProvider";
import QuestionCard from "./components/QuestionCard";
import QuestionForm from "./components/QuestionForm";

export default function Member() {
  const { questions, memberPage } = useQuestions();
  const { user } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign_in");
    }
  }, [user]);

  return (
    <main>
      <Header />
      {memberPage === "addQuestion" ? (
        <QuestionForm />
      ) : (
        <table className="questions-table">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Answers</th>
              <th>Author</th>
            </tr>
          </thead>
          {questions
            ?.filter((e) => e.userId === user?.id)
            .map((Q, I) => (
              <QuestionCard key={I} data={Q} />
            ))}
        </table>
      )}
    </main>
  );
}
