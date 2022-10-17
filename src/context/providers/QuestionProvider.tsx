import { createContext, useContext, useState, useEffect } from "react";
import { QuestionType } from "../../types/QuestionType";
import { PropsType } from "../../types/PropsType";
import { QuestionContextType } from "../../types/QuestionContextType";
import apiService from "../../services/apiService";

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

  const value = {
    questions,
    setQuestions,
    setRefresh,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestions = () =>
  useContext(QuestionContext) as QuestionContextType;
