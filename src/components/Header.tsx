import { useNavigate, useLocation } from "react-router-dom";
import { useUsers } from "../context/providers/UserProvider";
import { removeUser } from "../utils/localStorage";

export default function Header() {
  const { user, setUser } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const navOptions = { admin: "/admin", member: "/member" };
  const role = user?.role as keyof typeof navOptions;
  const path = location.pathname;

  const navHome = () => {
    if (path === navOptions[role]) {
      return (
        <div>
          <button type="button" onClick={() => navigate("/")}>
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              removeUser();
              setUser(null);
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      );
    }
  };

  const navMemberArea = () => {
    if (path === "/" || path.includes("question")) {
      return (
        <button type="button" onClick={() => navigate(navOptions[role])}>
          Member Area
        </button>
      );
    }
  };

  const navLogin = () => {
    if (!user) {
      return (
        <div>
          <button type="button" onClick={() => navigate("/sign_up")}>
            Contribute
          </button>
          <button type="button" onClick={() => navigate("/sign_in")}>
            Login
          </button>
        </div>
      );
    }
  };

  return (
    <header className="header">
      <p>Logo</p>
      {navHome()}
      {navMemberArea()}
      {navLogin()}
    </header>
  );
}
