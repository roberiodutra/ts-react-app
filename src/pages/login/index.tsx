import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";
import { UserLoginType } from "../../types/UserLoginType";
import apiService from "../../services/apiService";
import Register from "./components/Register";

export default function Login() {
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
          {...register("email")}
          placeholder="email"
          type="email"
          required
        />
        <p>{errors.email?.message}</p>

        <input
          {...register("password")}
          placeholder="password"
          type="password"
          required
        />
        <p>{errors.password?.message}</p>

        <button type="submit">Sign in</button>
      </form>
      <Register />
    </>
  );
}
