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
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
      <Header />
      <section className="form">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <fieldset>
            <legend>
              <b>Sign In</b>
            </legend>

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
              <div>{errLogin || errors.email?.message}</div>
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

            <button data-testid="login_button" type="submit">
              Login
            </button>
          </fieldset>
        </form>

        <p>Don't have an account?</p>

        <button
          data-testid="register_button"
          type="button"
          onClick={() => navigate("/sign_up")}
        >
          Register
        </button>
      </section>
      <Footer />
    </main>
  );
}
