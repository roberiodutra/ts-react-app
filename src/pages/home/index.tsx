import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { useQuestions } from "../../context/providers/QuestionProvider";
import QuestionCard from "../member/components/QuestionCard";

export default function Home() {
  const { questions, setStatus } = useQuestions();

  useEffect(() => {
    setStatus("published");
  }, []);

  return (
    <main>
      <Header />
      <table className="questions-table">
        <thead>
          <tr>
            <th>Questions</th>
            <th>Answers</th>
            <th>Author</th>
          </tr>
        </thead>
        {questions?.map((Q, I) => (
          <QuestionCard key={I} data={Q} />
        ))}
      </table>
      <Pagination />
      <Footer />
    </main>
  );
}
