import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserRegisterType } from "../../types/UserRegisterType";
import { registerSchema } from "../../schemas/registerSchema";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegisterType>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: UserRegisterType) => {
    console.log(data);
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
          <div>{errors.email?.message}</div>
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
