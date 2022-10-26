import { FormEvent } from "react";
import { useQuestions } from "../context/providers/QuestionProvider";

export default function Pagination() {
  const { page, setPage, pageCount } = useQuestions();
  const NAV_ITEMS = 7;
  const firstNavButton = Math.min(
    Math.max(page - (NAV_ITEMS - 1) / 2, 1),
    Math.max(pageCount - (NAV_ITEMS - 1), 1)
  );

  function handleChange(event: FormEvent<EventTarget>) {
    const target = event.target as HTMLInputElement;
    setPage(+target.value);
  }

  return (
    <div className="pagination">
      <ul>
        <li>
          <button disabled={page === 1} value={page - 1} onClick={handleChange}>
            &#8601;
          </button>
        </li>
        {Array(Math.min(NAV_ITEMS, pageCount))
          .fill(null)
          .map((_, index) => (
            <li key={index}>
              <button
                className={page === index + firstNavButton ? "active" : ""}
                value={index + firstNavButton}
                onClick={handleChange}
              >
                {index + firstNavButton}
              </button>
            </li>
          ))}
        <li>
          <button
            disabled={page === pageCount}
            value={page + 1}
            onClick={handleChange}
          >
            &#8599;
          </button>
        </li>
      </ul>
    </div>
  );
}
