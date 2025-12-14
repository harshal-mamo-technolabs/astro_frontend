// // Form.js
// import React, { useState } from "react";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import QuestionList from "./QuestionList";

// const Form = () => {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestionType, setNewQuestionType] = useState("text");
//   const [showQuestions, setShowQuestions] = useState(false);

//   const handleAddQuestion = () => {
//     const newQuestion = {
//       id: questions.length + 1,
//       type: newQuestionType,
//       label: `New ${capitalizeFirstLetter(newQuestionType)} Question`,
//     };

//     setQuestions([...questions, newQuestion]);
//     setShowQuestions(true);
//   };

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const newQuestions = [...questions];
//     const [reorderedQuestion] = newQuestions.splice(result.source.index, 1);
//     newQuestions.splice(result.destination.index, 0, reorderedQuestion);

//     setQuestions(newQuestions);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="questions">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             <h1>Untitled Form</h1>
//             <QuestionList
//               questions={questions}
//               setQuestions={setQuestions}
//               showQuestions={showQuestions}
//             />
//             {provided.placeholder}
//             <div>
//               <label>
//                 New Question Type:
//                 <select
//                   value={newQuestionType}
//                   onChange={(e) => setNewQuestionType(e.target.value)}
//                 >
//                   <option value="text">Text</option>
//                   <option value="email">Email</option>
//                   <option value="number">Number</option>
//                   <option value="phone">Phone</option>
//                   <option value="radio">Radio</option>
//                 </select>
//               </label>
//               <button onClick={handleAddQuestion}>Add Question</button>
//             </div>
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default Form;
