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
      status: "pending",
    });
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="question">
          Question
          <input
            type="text"
            {...register("question")}
            placeholder="Write a question"
            required
          />
          <div>{errors.question?.message}</div>
        </label>
        <label htmlFor="answer">
          Answer
          <input
            type="text"
            {...register("answer")}
            placeholder="Answer URL"
            required
          />
          <div>{errors.answer?.message}</div>
        </label>
        <button type="submit" onClick={() => setRefresh(true)}>
          Send
        </button>
      </form>
    </div>
  );
}
