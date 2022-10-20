import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserRegisterType } from "../../types/UserRegisterType";
import { registerSchema } from "../../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../utils/localStorage";
import { useUsers } from "../../context/providers/UserProvider";
import { useState } from "react";
import apiService from "../../services/apiService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Register() {
  const [errRegister, setErrRegister] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUsers();
  const {
    register,
    handleSubmit,
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
      <Header />
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>
              <b>Sign Up</b>
            </legend>
            <div className="form-box">
              <input
                className="form-input"
                id="first-name"
                type="text"
                {...register("firstName")}
                required
              />
              <label htmlFor="first-name" className="form-label">
                First Name
              </label>
              <div>{errors.firstName?.message}</div>
            </div>

            <div className="form-box">
              <input
                className="form-input"
                id="last-name"
                type="text"
                {...register("lastName")}
                required
              />
              <label htmlFor="last-name" className="form-label">
                Last Name
              </label>
              <div>{errors.lastName?.message}</div>
            </div>

            <div className="form-box">
              <input
                className="form-input"
                id="email"
                type="text"
                {...register("email")}
                required
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div>{errRegister || errors.email?.message}</div>
            </div>

            <div className="form-box">
              <input
                className="form-input"
                id="password"
                type="password"
                {...register("password")}
                required
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div>{errors.password?.message}</div>
            </div>

            <div className="form-box">
              <input
                className="form-input"
                id="confirm-password"
                type="password"
                {...register("confirmPassword")}
                required
              />
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <div>{errors.confirmPassword?.message}</div>
            </div>

            <div className="form-button">
              <button type="submit">Register</button>
            </div>
          </fieldset>
        </form>

        <p>Have an account?</p>

        <button
          className="sign-button"
          type="button"
          onClick={() => navigate("/sign_in")}
        >
          Sign In
        </button>
      </section>
      <Footer />
    </main>
  );
}
