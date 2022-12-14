import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { useQuestions } from "../../context/providers/QuestionProvider";
import { getUser } from "../../utils/localStorage";
import QuestionCard from "./components/QuestionCard";
import QuestionForm from "./components/QuestionForm";

export default function Member() {
  const { questions, memberPage, setStatus, setPage } = useQuestions();
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign_in");
    }
    setStatus("published");
    setPage(1);
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
              <th></th>
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
      {memberPage === "myQuestions" ? <Pagination /> : null}
      <Footer />
    </main>
  );
}
