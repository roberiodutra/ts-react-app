import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../../services/apiService";
import { QuestionType } from "../../types/QuestionType";
import { PropsType } from "../../types/PropsType";
import { UserContextType } from "../../types/UserContextType";
import { QuestionContextType } from "../../types/QuestionContextType";

const QuestionContext = createContext<QuestionContextType | null>(null);

export function QuestionProvider({ children }: PropsType) {
  const [questions, setQuestions] = useState<QuestionType[] | null>([]);

  useEffect(() => {
    (async () => {
      // await apiService.getAll().then(({ data }) => setUsers(data));
    })();
  }, []);

  const value = {
    questions,
    setQuestions,
  };

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>;
}

export const useQuestions = () => useContext(QuestionContext) as QuestionContextType;
