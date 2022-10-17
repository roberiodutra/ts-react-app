import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUsers } from '../../../context/providers/UserProvider';
import { questionSchema } from '../../../schemas/questionSchema';
import { QuestionType } from '../../../types/QuestionType';
import apiService from '../../../services/apiService';

export default function QuestionForm() {
  const { user } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionType>({
    resolver: yupResolver(questionSchema),
  });

  const onSubmit = async (data: QuestionType) => {
    const res = await apiService.adminRegister(user.token, data);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor="question">
          Question
          <input
            { ...register('question') }
          />
        </label>
        <label htmlFor="answer">
          Answer
          <input
            { ...register('answer') }
          />
        </label>
        <button
          type="button"
          // onClick={ () => setRefresh(true) }
        >
          Send
        </button>
      </form>
    </div>
  );
}
