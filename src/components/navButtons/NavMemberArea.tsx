import { useNavigate, useLocation } from "react-router-dom";
import { useUsers } from "../../context/providers/UserProvider";

export default function NavMemberArea() {
  const { user } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const navOptions = { admin: "/admin", member: "/member" };
  const role = user?.role as keyof typeof navOptions;
  const path = location.pathname;

  return (
    <div>
      {(path === "/" ||
        path.includes("question")) && (
          <div>
            <button
              className="navbar-buttons"
              type="button"
              onClick={() => navigate(navOptions[role])}
            >
              Member Area
            </button>
          </div>
        )}
    </div>
  );
}
