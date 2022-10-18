import { useEffect, useState } from "react";
import { useUsers } from "../../../context/providers/UserProvider";
import { dataType } from "../../../types/dataType";
import { removeUser } from "../../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../../context/providers/QuestionProvider";
import apiService from "../../../services/apiService";

export default function QuestionCard({
  data: { question, status, _id },
}: dataType) {
  const [admin, setAdmin] = useState(false);
  const [owner, setOwner] = useState(false);
  const { user, setUser } = useUsers();
  const { updateQ, deleteQ } = useQuestions();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (user) {
        apiService.getUserById(user.id).then(({ data }) => {
          if (user.email !== data.email || user.role !== data.role) {
            removeUser();
            setUser(null);
            navigate("/sign_in");
          }
          data.role === "admin" && setAdmin(true);
        });
      }
    })();
  }, [user]);

  useEffect(() => {
    (() => {
      if (user) {
        apiService.getQuestionById(_id).then(({ data }) => {
          if (user.id === data.userId || user.role === "admin") {
            setOwner(true);
          }
        });
      }
    })();
  }, [user]);

  return (
    <div>
      <div>{question}</div>
      {admin && (
        <button
          type="button"
          hidden={status !== "pending"}
          onClick={() => updateQ(_id, { status: "published" })}
        >
          Publish
        </button>
      )}
      {owner && (
        <div>
          <button type="button" onClick={() => navigate(`/question/${_id}`)}>
            Edit
          </button>
          <button type="button" onClick={() => deleteQ(_id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
