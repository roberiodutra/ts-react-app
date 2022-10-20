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
      navigate(`/${user?.role}`);
    }
    reset();
  };

  return (
    <div>
      <Header />
      {isOwner && (
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend>
                <b>Editor Mode</b>
              </legend>
              <div className="form-box">
                <textarea
                  className="text-area form-input"
                  id="question"
                  {...register("question")}
                  defaultValue={question?.question}
                  rows={4}
                  maxLength={60}
                  required
                />
                <label htmlFor="question" className="form-label">
                  Question
                </label>
                <div>{errors.question?.message}</div>
              </div>
              <div className="form-box">
                <textarea
                  className="text-area form-input"
                  id="answer"
                  {...register("answer")}
                  defaultValue={question?.answer}
                  rows={4}
                  required
                />
                <label htmlFor="answer" className="form-label">
                  Answer
                </label>
                <div>{errors.answer?.message}</div>
              </div>
              <button type="submit">Save</button>
            </fieldset>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}
