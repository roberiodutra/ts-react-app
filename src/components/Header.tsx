import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../context/providers/QuestionProvider";
import { useUsers } from "../context/providers/UserProvider";
import QuestionCard from "../pages/member/components/QuestionCard";
import QuestionForm from "../pages/member/components/QuestionForm";

export default function Header() {
  const { questions } = useQuestions();
  const { user } = useUsers();
  const navigate = useNavigate();

  return (
    <header>
      Header
    </header>
  );
}
