import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUsers } from '../../../context/providers/UserProvider';
import { questionSchema } from '../../../schemas/questionSchema';
import { QuestionType } from '../../../types/QuestionType';
import apiService from '../../../services/apiService';
import { useState } from 'react';

export default function QuestionForm() {
  const [refresh, setRefresh] = useState(false);
  const { user } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionType>({
    resolver: yupResolver(questionSchema),
  });

  const onSubmit = async (data: QuestionType) => {
    await apiService.registerQuestion({
      ...data,
      userId: user?.id,
      status: 'pending',
    });
    reset();
  };

  return (
    <div>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor="question">
          Question
          <input
            type="text"
            { ...register('question') }
            placeholder="Write the question"
            required
          />
          <div>{errors.question?.message}</div>
        </label>
        <label htmlFor="answer">
          Answer
          <input
            type="text"
            { ...register('answer') }
            placeholder="Answer URL"
            required
          />
          <div>{errors.answer?.message}</div>
        </label>
        <button
          type="submit"
          // onClick={ () => setRefresh(true) }
        >
          Send
        </button>
      </form>
    </div>
  );
}
