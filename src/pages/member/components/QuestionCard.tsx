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
  const { user } = useUsers();
  const { publishQ, deleteQ } = useQuestions();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (user) {
        apiService.getUserById(user.id).then(({ data }) => {
          if (user.email !== data.email || user.role !== data.role) {
            removeUser();
            navigate("/sign_in");
          }
          data.role === "admin" ? setAdmin(true) : navigate("/member");
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
          disabled={status !== "pending"}
          onClick={() => publishQ(_id, { status: "published" })}
        >
          Publish
        </button>
      )}
      <button type="button">Edit</button>
      <button type="button" onClick={() => deleteQ(_id)}>
        Delete
      </button>
    </div>
  );
}
