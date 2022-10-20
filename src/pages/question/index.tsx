import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUsers } from "../../context/providers/UserProvider";
import { questionSchema } from "../../schemas/questionSchema";
import { QuestionType } from "../../types/QuestionType";
import { useQuestions } from "../../context/providers/QuestionProvider";
import apiService from "../../services/apiService";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Question() {
  const [isOwner, setOwner] = useState(false);
  const [question, setQuestion] = useState<QuestionType>();
  const { updateQ } = useQuestions();
  const { user } = useUsers();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionType>({
    resolver: yupResolver(questionSchema),
  });

  useEffect(() => {
    if (id) {
      apiService.getQuestionById(id).then(({ data }) => {
        if (user?.id === data.userId || user?.role === "admin") {
          setOwner(true);
          setQuestion(data);
        }
      });
    }
  }, [user]);

  const onSubmit = (data: QuestionType) => {
    if (id) {
      updateQ(id, { ...data, status: "pending" });
      navigate("/member");
    }
    reset();
  };

  return (
    <div>
      <Header />
      {isOwner && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="question">
            Question
            <input
              type="text"
              {...register("question")}
              defaultValue={question?.question}
              required
            />
            <div>{errors.question?.message}</div>
          </label>
          <label htmlFor="answer">
            Answer
            <input
              type="text"
              {...register("answer")}
              defaultValue={question?.answer}
              required
            />
            <div>{errors.answer?.message}</div>
          </label>
          <button type="submit">Save</button>
        </form>
      )}
      <Footer />
    </div>
  );
}
