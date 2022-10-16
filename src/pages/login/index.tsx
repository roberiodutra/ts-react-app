import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";
import { UserLoginType } from "../../types/UserLoginType";
import { useNavigate } from 'react-router-dom';
import apiService from "../../services/apiService";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginType>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmitHandler = (data: UserLoginType) => {
    console.log({ data });
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2>Log into your account.</h2>

        <input
          type="email"
          {...register("email")}
          placeholder="email"
          required
        />
        <p>{errors.email?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="password"
          required
        />
        <p>{errors.password?.message}</p>

        <button type="submit">Sign in</button>
      </form>
      <button
          type="button"
          onClick={ () => navigate('/sign_up') }
        >
          Não tem uma conta? Cadastre-se
        </button>
    </>
  );
}
