import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserRegisterType } from "../../types/UserRegisterType";
import { registerSchema } from "../../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../utils/localStorage";
import { useUsers } from "../../context/providers/UserProvider";
import { useState } from "react";
import apiService from "../../services/apiService";

export default function Register() {
  const [errRegister, setErrRegister] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUsers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegisterType>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: UserRegisterType) => {
    const { confirmPassword, ...rest } = data;
    apiService
      .signUP({ ...rest, role: "member" })
      .then(({ data }) => {
        setUser(data);
        saveUser(data);
        navigate("/member");
      })
      .catch((_e) => {
        setErrRegister("User already exists");
      });
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register("firstName")}
            placeholder="first name"
            required
          />
          <div>{errors.firstName?.message}</div>
        </div>

        <div>
          <input
            type="text"
            {...register("lastName")}
            placeholder="last name"
            required
          />
          <div>{errors.lastName?.message}</div>
        </div>

        <div>
          <input
            type="text"
            {...register("email")}
            placeholder="email"
            required
          />
          <div>{errRegister || errors.email?.message}</div>
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
            required
          />
          <div>{errors.password?.message}</div>
        </div>

        <div>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="confirm password"
            required
          />
          <div>{errors.confirmPassword?.message}</div>
        </div>

        <div>
          <button type="submit">Register</button>
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>

      <p>Tem uma conta?</p>

      <button type="button" onClick={() => navigate("/sign_in")}>
        Conecte-se
      </button>
    </main>
  );
}
