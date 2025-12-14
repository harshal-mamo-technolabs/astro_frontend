import { createContext, useContext, useState } from "react";

const QuestionsContext = createContext();
export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestionlist = () => {
  return useContext(QuestionsContext);
};
