import { FormEvent } from "react";
import { useQuestions } from "../context/providers/QuestionProvider";

export default function Pagination() {
  const { page, setPage, pageCount } = useQuestions();
  const NAV_ITEMS = 9;
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
      <button disabled={page === 1} value={page - 1} onClick={handleChange}>
        Previous<i className="fa-regular fa-arrow-down-left"></i>
      </button>
      <button
        disabled={page === pageCount}
        value={page + 1}
        onClick={handleChange}
      >
        Next<i className="fa-regular fa-arrow-up-right"></i>
      </button>
      <ul>
        {Array(Math.min(NAV_ITEMS, pageCount))
          .fill(null)
          .map((_, index) => (
            <li key={index}>
              <button
                className={
                  index === pageCount / 9 + 1 ? "pagination__item--active" : ""
                }
                value={index + firstNavButton}
                onClick={handleChange}
              >
                {index + firstNavButton}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
