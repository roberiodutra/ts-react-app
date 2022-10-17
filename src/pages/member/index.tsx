import { useQuestions } from "../../context/providers/QuestionProvider";
import QuestionForm from "./components/QuestionForm";

export default function Member() {
  const { questions } = useQuestions();
  console.log('🚀 ~ Member ~ questions', questions);
  return (
    <main>
      <QuestionForm />
    </main>
  );
}
