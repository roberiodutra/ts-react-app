import { useEffect, useState } from "react";
import { useUsers } from "../../../context/providers/UserProvider";
import { dataType } from "../../../types/dataType";
import { removeUser } from "../../../utils/localStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuestions } from "../../../context/providers/QuestionProvider";
import apiService from "../../../services/apiService";
import getFavicon from "../../../utils/getFavicon";

export default function QuestionCard({
  data: { question, status, _id, author, answer },
}: dataType) {
  const [admin, setAdmin] = useState(false);
  const [owner, setOwner] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user, setUser } = useUsers();
  const { updateQ, deleteQ } = useQuestions();
  const navigate = useNavigate();
  const defaultImg = "src/assets/default-img.png";
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (user) {
      apiService.getUserById(user.id).then(({ data }) => {
        if (user.email !== data.email || user.role !== data.role) {
          removeUser();
          setUser(null);
          navigate("/sign_in");
        }
        data.role === "admin" ? setAdmin(true) : null;
      });

      apiService.getQuestionById(_id).then(({ data }) => {
        if (user.id === data.userId || user.role === "admin") {
          setOwner(true);
        }
      });
    }
  }, [user]);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
    <tbody>
      <tr>
        <td>
          {
            <a href={answer} target="_blank" rel="noopener noreferrer">
              {question}
            </a>
          }
        </td>
        {path !== "/" ? (
          <td>
            <nav className="navbar">
              <button
                data-testid="gear-actions"
                className="actions"
                onClick={handleToggle}
              >
                {navbarOpen ? (
                  <i className="fa-solid fa-x"></i>
                ) : (
                  <i className="fa-sharp fa-solid fa-gear"></i>
                )}
              </button>
              <div className={`actions-menu ${navbarOpen ? " show-menu" : ""}`}>
                {admin ? (
                  <button
                    className="actions"
                    hidden={status !== "pending"}
                    onClick={() => updateQ(_id, { status: "published" })}
                  >
                    Publish
                  </button>
                ) : null}
                {owner ? (
                  <div>
                    <button
                      className="actions"
                      onClick={() => navigate(`/question/${_id}`)}
                    >
                      Edit
                    </button>
                    <button className="actions" onClick={() => deleteQ(_id)}>
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </nav>
          </td>
        ) : null}
        <td>
          <img
            src={getFavicon(answer)}
            alt="answer"
            onError={(event) => {
              (event.target as HTMLImageElement).src = defaultImg;
              (event.target as HTMLImageElement).onerror = null;
            }}
          />
        </td>
        <td>{author}</td>
      </tr>
    </tbody>
  );
}
