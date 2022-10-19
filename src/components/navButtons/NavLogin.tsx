import { useNavigate, useLocation } from "react-router-dom";
import { useUsers } from "../../context/providers/UserProvider";

export default function NavLogin() {
  const { user } = useUsers();
  const navigate = useNavigate();

  return (
    <div>
      {!user && (
        <div>
          <button
            className="navbar-buttons"
            type="button"
            onClick={() => navigate("/sign_up")}
          >
            Contribute
          </button>
          <button
            className="navbar-buttons"
            type="button"
            onClick={() => navigate("/sign_in")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
