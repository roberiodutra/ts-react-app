import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUsers } from "../../../context/providers/UserProvider";
import { questionSchema } from "../../../schemas/questionSchema";
import { QuestionType } from "../../../types/QuestionType";
import { useQuestions } from "../../../context/providers/QuestionProvider";
import apiService from "../../../services/apiService";

export default function QuestionForm() {
  const { user } = useUsers();
  const { setRefresh } = useQuestions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionType>({
    resolver: yupResolver(questionSchema),
  });

  const onSubmit = (data: QuestionType) => {
    apiService.registerQuestion({
      ...data,
      userId: user?.id,
      author: user?.fullName,
      status: "pending",
    });
    reset();
  };

  return (
    <section className="question form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>
            <b>Post a Question</b>
          </legend>
          <div className="form-box">
            <input
              className="form-input"
              id="question"
              type="text"
              {...register("question")}
              maxLength={80}
              required
            />
            <label htmlFor="question" className="form-label">
              Question
            </label>
            <div>{errors.question?.message}</div>
          </div>
          <div className="form-box">
            <input
              className="form-input"
              id="answer"
              type="text"
              {...register("answer")}
              required
            />
            <label htmlFor="answer" className="form-label">
              Answer(link)
            </label>
            <div>{errors.answer?.message}</div>
          </div>
          <button type="submit" onClick={() => setRefresh(true)}>
            Send
          </button>
        </fieldset>
      </form>
    </section>
  );
}
