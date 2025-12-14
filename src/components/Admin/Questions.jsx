// const Question = ({ question, onChange, onDelete }) => {
//   const handleLabelChange = (e) => {
//     onChange({ ...question, label: e.target.value });
//   };

import { Box, Flex, Input, Select } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { MdClose } from "react-icons/md";

//   const handleTypeChange = (e) => {
//     onChange({
//       ...question,
//       type: e.target.value,
//       options: e.target.value === "text" ? [] : ["Option 1"],
//     });
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...question.options];
//     updatedOptions[index] = value;
//     onChange({ ...question, options: updatedOptions });
//   };

//   const handleAddOption = () => {
//     onChange({
//       ...question,
//       options: [...question.options, `Option ${question.options.length + 1}`],
//     });
//   };

//   const handleDeleteOption = (index) => {
//     const updatedOptions = [...question.options];
//     updatedOptions.splice(index, 1);
//     onChange({ ...question, options: updatedOptions });
//   };

//   return (
//     <div>
//       <label>
//         Question Label:
//         <input
//           type="text"
//           value={question.label}
//           onChange={handleLabelChange}
//         />
//       </label>
//       <label>
//         Question Type:
//         <select value={question.type} onChange={handleTypeChange}>
//           <option value="text">Text</option>
//           <option value="radio">Multiple Choice</option>
//         </select>
//       </label>
//       {question.type === "radio" && (
//         <div>
//           <p>Options:</p>
//           {question.options.map((option, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//               />
//               <button onClick={() => handleDeleteOption(index)}>Delete</button>
//             </div>
//           ))}
//           <button onClick={handleAddOption}>Add Option</button>
//         </div>
//       )}
//       <button onClick={() => onDelete(question.id)}>Delete Question</button>
//       <hr />
//     </div>
//   );
// };

// export default Question;
const Questions = ({
  question,
  index,
  handleQuestionChange,
  handleTypeChange,
  removeQuestion,
  handleOptionChange,
  addOption,
  removeOption,
}) => {
  const [, ref] = useDrag({
    type: "QUESTION",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "QUESTION",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        // Implement logic to reorder questions
      }
    },
  });

  return (
    <Box
      ref={(node) => ref(drop(node))}
      key={index}
      mt={index > 0 ? 4 : 0}
      bg="#1a102e"
      p={4}
      borderRadius="md"
    >
      <Flex align="center" mb={2}>
        <Input
          value={question.text}
          onChange={(e) => handleQuestionChange(question.id, e.target.value)}
          placeholder={`Question`}
        />
        <Select
          value={question.type}
          onChange={(e) => handleTypeChange(question.id, e.target.value)}
          ml={2}
        >
          {[
            "text",
            "number",
            "email",
            "textarea",
            "checkbox",
            "radio",
            "time",
            "date",
          ].map((type) => (
            <option key={type} value={type} className="text-black">
              {type}
            </option>
          ))}
        </Select>
        <MdClose
          aria-label="Remove question"
          className="text-6xl cursor-pointer text-red-600"
          onClick={() => removeQuestion(question.id)}
          ml={2}
        />
      </Flex>
      {question.type === "time" && (
        <div>
          <Input
            type="time"
            value={question.options[0]}
            onChange={(e) => handleOptionChange(question.id, 0, e.target.value)}
            mb={2}
          />
        </div>
      )}
      {question.type === "date" && (
        <div>
          <Input
            type="date"
            value={question.options[0]}
            onChange={(e) => handleOptionChange(question.id, 0, e.target.value)}
            mb={2}
          />
        </div>
      )}
      {question.type !== "time" && question.type !== "date" && (
        <>
          {question.options.map((option, optionIndex) => (
            <Flex key={optionIndex} align="center" gap={10} m={1}>
              <Input
                value={option}
                onChange={(e) =>
                  handleOptionChange(question.id, optionIndex, e.target.value)
                }
                placeholder={`Option ${optionIndex + 1}`}
              />
              <MdClose
                aria-label="Remove option"
                className="text-6xl cursor-pointer text-red-600"
                onClick={() => removeOption(question.id, optionIndex)}
                ml={2}
              />
            </Flex>
          ))}
          <button
            onClick={() => addOption(question.id)}
            className="cursor-pointer"
          >
            Add option
          </button>
        </>
      )}
    </Box>
  );
};

export default Questions;
