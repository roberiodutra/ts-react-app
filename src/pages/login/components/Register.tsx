import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserRegisterType } from "../../../types/UserRegisterType";
import { registerSchema } from "../../../schemas/registerSchema";

export default function Register() {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("firstName")}
            type="text"
            placeholder="first name"
            required
          />
          <div>{errors.firstName?.message}</div>
        </div>

        <div>
          <input
            {...register("lastName")}
            type="text"
            placeholder="last name"
            required
          />
          <div>{errors.lastName?.message}</div>
        </div>

        <div>
          <input
            {...register("email")}
            type="text"
            placeholder="email"
            required
          />
          <div>{errors.email?.message}</div>
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            required
          />
          <div>{errors.password?.message}</div>
        </div>

        <div>
          <input
            {...register("confirmPassword")}
            type="password"
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
    </div>
  );
}
