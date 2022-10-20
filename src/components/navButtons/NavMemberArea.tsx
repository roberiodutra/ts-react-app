import { useNavigate, useLocation } from "react-router-dom";
import { useQuestions } from "../../context/providers/QuestionProvider";
import { useUsers } from "../../context/providers/UserProvider";
import { removeUser } from "../../utils/localStorage";

export default function NavMemberArea() {
  const { user, setUser } = useUsers();
  const { memberPage, setMemberPage } = useQuestions();
  const navigate = useNavigate();
  const location = useLocation();
  const navOptions = { admin: "/admin", member: "/member" };
  const role = user?.role as keyof typeof navOptions;
  const path = location.pathname;
  const navMember = { add: "addQuestion", own: "myQuestions" };
  const titleByUserRole = role === "admin" ? "Dashboard" : "My Questions";

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
          {memberPage === navMember.add && (
            <button
              className="navbar-buttons"
              type="button"
              onClick={() => setMemberPage(navMember.own)}
            >
              {titleByUserRole}
            </button>
          )}
          {memberPage === navMember.own && (
            <button
              className="navbar-buttons"
              type="button"
              onClick={() => setMemberPage(navMember.add)}
            >
              Add a Question
            </button>
          )}
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
