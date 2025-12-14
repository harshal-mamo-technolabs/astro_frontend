// // QuestionList.js
// import React from "react";
// import Question from "./Questions";

// const QuestionList = ({ questions, setQuestions, showQuestions }) => {
//   const handleQuestionChange = (updatedQuestion) => {
//     const updatedQuestions = questions.map((q) =>
//       q.id === updatedQuestion.id ? updatedQuestion : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   const handleDeleteQuestion = (questionId) => {
//     const updatedQuestions = questions.filter((q) => q.id !== questionId);
//     setQuestions(updatedQuestions);
//   };

//   const handleEditQuestion = (questionId) => {
//     // Toggle the 'editing' property to show/hide options in the Question component
//     const updatedQuestions = questions.map((q) =>
//       q.id === questionId ? { ...q, editing: !q.editing } : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   return (
//     <div>
//       {showQuestions &&
//         questions.map((question) => (
//           <Question
//             key={question.id}
//             question={question}
//             onChange={handleQuestionChange}
//             onDelete={handleDeleteQuestion}
//             onEdit={handleEditQuestion}
//           />
//         ))}
//     </div>
//   );
// };

// export default QuestionList;
