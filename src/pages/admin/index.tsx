import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { useQuestions } from "../../context/providers/QuestionProvider";
import { useUsers } from "../../context/providers/UserProvider";
import QuestionCard from "../member/components/QuestionCard";
import QuestionForm from "../member/components/QuestionForm";

export default function Admin() {
  const { questions, memberPage, setStatus, setPage } = useQuestions();
  const { user } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign_in");
    }
    setStatus("pending");
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
            ?.filter((e) => e.status === "pending")
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
