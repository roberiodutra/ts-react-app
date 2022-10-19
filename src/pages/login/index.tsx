import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";
import { UserLoginType } from "../../types/UserLoginType";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/providers/UserProvider";
import { useEffect, useState } from "react";
import { saveUser, getUser } from "../../utils/localStorage";
import { UserRoleType } from "../../types/UserRoleType";
import apiService from "../../services/apiService";

export default function Login() {
  const [errLogin, setErrLogin] = useState("");
  const redirectOptions = {
    admin: "/admin",
    member: "/member",
  };
  const navigate = useNavigate();
  const { setUser } = useUsers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginType>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    const localUser = getUser();
    if (localUser) {
      (() => {
        setUser({ ...localUser });
        const { role } = localUser;
        navigate(redirectOptions[role as keyof UserRoleType]);
      })();
    }
  }, [navigate, setUser]);

  const onSubmitHandler = (data: UserLoginType) => {
    apiService
      .signIN(data)
      .then(({ data }) => {
        console.log('🚀 ~ .then ~ data', data);
        const { role } = data;
        setUser(data);
        saveUser(data);
        navigate(redirectOptions[role as keyof UserRoleType]);
      })
      .catch((_e) => {
        setErrLogin("User not found");
      });
    reset();
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2>Log into your account.</h2>

        <input
          type="email"
          {...register("email")}
          placeholder="email"
          required
        />
        <p>{errLogin || errors.email?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="password"
          required
        />
        <p>{errors.password?.message}</p>

        <button type="submit">Sign in</button>
      </form>

      <p>Não tem uma conta?</p>

      <button type="button" onClick={() => navigate("/sign_up")}>
        Cadastre-se
      </button>
    </main>
  );
}
