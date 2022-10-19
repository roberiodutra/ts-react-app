import { useNavigate, useLocation } from "react-router-dom";
import { useUsers } from "../../context/providers/UserProvider";
import { removeUser } from "../../utils/localStorage";

export default function NavHome() {
  const { user, setUser } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const navOptions = { admin: "/admin", member: "/member" };
  const role = user?.role as keyof typeof navOptions;
  const path = location.pathname;

  return (
    <div>
      {path === navOptions[role] && (
        <div>
          <button
            className="navbar-buttons"
            type="button"
            onClick={() => navigate("/")}
          >
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
      )}
    </div>
  );
}
