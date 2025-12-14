// // DraggableQuestion.js
// import { Draggable } from 'react-beautiful-dnd';

// const DraggableQuestion = ({ question, index, options, onOptionsChange }) => {
//   const handleOptionsChange = (newOptions) => {
//     onOptionsChange(index, newOptions);
//   };

//   return (
//     <Draggable draggableId={`question-${index}`} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           style={{
//             userSelect: 'none',
//             padding: 16,
//             margin: '0 0 8px 0',
//             background: provided.isDragging ? 'lightblue' : 'white',
//             ...provided.draggableProps.style,
//           }}
//         >
//           <h3>{question}</h3>
//           {options.map((option, optionIndex) => (
//             <div key={optionIndex}>
//               <label>
//                 Option {optionIndex + 1}:
//                 <input
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionsChange([...options.slice(0, optionIndex), e.target.value, ...options.slice(optionIndex + 1)])}
//                 />
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default DraggableQuestion;


import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

const DraggableQuestion = ({
  index,
  removeQuestion,
  children,
}) => {
  return (
    <Box
      mt={index > 0 ? 4 : 0}
      bg="#1a102e"
      p={4}
      borderRadius="md"
      _hover={{ bg: "yellow.200" }}
    >
      {children}
      <Flex align="center" mb={2}>
        <IconButton
          aria-label="Remove question"
          className="text-6xl cursor-pointer text-red-600"
          icon={<MdClose />}
          onClick={() => removeQuestion(index)}
          ml={2}
        />
      </Flex>
    </Box>
  );
};

export default DraggableQuestion;

