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

const QuestionContext = createContext<QuestionContextType | null>(null);

export function QuestionProvider({ children }: PropsType) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      await apiService.getAllQuestions().then(({ data }) => setQuestions(data));
      setRefresh(false);
    })();
  }, [refresh]);

  const publishQ = useCallback(async (id: string, data: QuestionStatusType) => {
    await apiService.updateQuestion(id, data);
  }, []);

  const value = {
    questions,
    setQuestions,
    setRefresh,
    publishQ,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestions = () =>
  useContext(QuestionContext) as QuestionContextType;
