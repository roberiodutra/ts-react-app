import { FormEvent } from "react";
import { useQuestions } from "../context/providers/QuestionProvider";

export default function Pagination() {
  const { page, setPage, pageCount } = useQuestions();
  const current = page ? page / 2 + 1 : 1;
  const NAV_ITEMS = 9;
  const MAX_LEFT = (NAV_ITEMS - 1) / 2;
  const maxFirst = Math.max(pageCount - (NAV_ITEMS - 1), 1);
  const first = Math.min(Math.max(current - MAX_LEFT, 1), maxFirst);

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
          .map((_, index) => index + first)
          .map((index) => (
            <li key={index}>
              <button value={index + 1} onClick={handleChange}>
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
