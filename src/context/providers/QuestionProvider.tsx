import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { QuestionType } from "../../types/QuestionType";
import { PropsType } from "../../types/PropsType";
import { QuestionContextType } from "../../types/QuestionContextType";
import apiService from "../../services/apiService";
import { QuestionStatusType } from "../../types/QuestionStatusType";
import { IQuestionQ } from "../../types/IQuestionQ";

const QuestionContext = createContext<QuestionContextType | null>(null);

export function QuestionProvider({ children }: PropsType) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [memberPage, setMemberPage] = useState("myQuestions");
  const [questionStatus, setStatus] = useState("published");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const LIMIT = 2;

  useEffect(() => {
    apiService
      .getAllQuestions(page, LIMIT, questionStatus)
      .then(({ data: { questions, total } }) => {
        setQuestions(questions);
        setPageCount(Math.ceil(total[0].count / LIMIT));
      });
    setRefresh(false);
  }, [refresh, page, questionStatus]);

  const updateQ = useCallback(
    async (id: string, data: QuestionStatusType | IQuestionQ) => {
      await apiService.updateQuestion(id, data).then(() => {
        setRefresh(true);
      });
    },
    []
  );

  const deleteQ = useCallback(async (id: string) => {
    await apiService.deleteQuestion(id).then(() => {
      setRefresh(true);
    });
  }, []);

  const value = {
    questions,
    setQuestions,
    setRefresh,
    updateQ,
    deleteQ,
    memberPage,
    setMemberPage,
    page,
    setPage,
    pageCount,
    setStatus,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestions = () =>
  useContext(QuestionContext) as QuestionContextType;
