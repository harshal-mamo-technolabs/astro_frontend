import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Center, Divider, Image } from "@chakra-ui/react";
import tarotCard from "../assets/tarotcard.png";
import { message } from "antd";
import { motion } from "framer-motion";
import BackToTopButton from "../components/ScrollTopButton";
import axios from "axios";
// const Cards = [
//   {
//     id: 1,
//     Image: tarotCard,
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell ",
//     cardname: "Strength",
//   },
//   {
//     id: 2,
//     Image: tarotCard,
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell ",
//     cardname: "Devil",
//   },
//   {
//     id: 3,
//     Image: tarotCard,
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell ",

//     cardname: "Hermit",
//   },
//   {
//     id: 4,
//     Image: tarotCard,
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell ",

//     cardname: "Strength",
//   },
//   {
//     id: 5,
//     Image: tarotCard,
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell ",

//     cardname: "Hermit",
//   },
//   {
//     id: 6,
//     Image: tarotCard,
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell ",

//     cardname: "Devil",
//   },
//   {
//     id: 7,
//     Image: tarotCard,
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell ",
//     cardname: "Hermit",
//   },
// ];

// export default function DailyTarot() {
//   const [data, setData] = useState({});
//   const [selectedCards, setSelectedCards] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [random, setRandom] = useState(Math.floor(Math.random() * 70));
//   useEffect(() => {
//     axios
//       .get("https://paste.soulharsh007.dev/ce48117.json")
//       .then((res) => setCards(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     const storedSelectedCards = JSON.parse(
//       localStorage.getItem("selectedCards")
//     );
//     if (storedSelectedCards) {
//       setSelectedCards(storedSelectedCards);
//     }
//   }, []);

//   useEffect(() => {
//     const tarotCards = cards.slice(random, random + 7);
//     console.log(tarotCards, "tarot cards");
//     getCards();
//   }, [random, cards]);

//   const getCards = () => {
//     axios
//       .get(
//         `https://paste.soulharsh007.dev/f01e4b0.json?love=${selectedCards[0]?.id}&career=${selectedCards[1]?.id}&finance=${selectedCards[2]?.id}`
//       )
//       .then((res) => setData(res.data.data))
//       .catch((err) => console.log(err));
//   };

//   const handleCardClick = (id) => {
//     if (selectedCards.length >= 3) {
//       message.error("Can't Add More than three cards");
//       return;
//     }

//     const isCardSelected = selectedCards.some(
//       (card) => card.id === cards[random + id]?.id
//     );

//     if (!isCardSelected && selectedCards.length < 3) {
//       const newSelectedCards = [
//         ...selectedCards,
//         { ...cards[random + id], selected: true },
//       ];
//       setSelectedCards(newSelectedCards);
//       localStorage.setItem("selectedCards", JSON.stringify(newSelectedCards));
//     } else if (isCardSelected) {
//       const updatedSelectedCards = selectedCards.filter(
//         (card) => card.id !== cards[random + id]?.id
//       );
//       setSelectedCards(updatedSelectedCards);
//       localStorage.setItem(
//         "selectedCards",
//         JSON.stringify(updatedSelectedCards)
//       );
//     }
//   };
//   return (
//     <>
//       <Box className="h-full">
//         <h1 className="text-center text-white lg:text-2xl font-nunito-light">
//           Find Out Your Card of The Day
//         </h1>
//         {selectedCards.length === 3 && (
//           <h2 className="text-center text-xl font-nunito-light text-white">
//             Selected Cards
//           </h2>
//         )}
//         <div className="">
//           {selectedCards.length === 3 ? (
//             <div className="">
//               <div className="flex flex-wrap mt-5 justify-between lg:m-4 me-2 ms-2">
//                 {selectedCards?.map((card) => (
//                   <div key={card.id} className="w-[30%]">
//                     <div className="flex justify-center">
//                       <motion.div
//                         initial={{ opacity: 0, rotateY: 180 }}
//                         animate={{ opacity: 1, rotateY: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="bg-white rounded-lg lg:w-[50%] w-[100%] md:w-[80%] lg:h-[40vh] h-[21vh]"
//                       >
//                         <h2 className="text-2xl font-bold "></h2>
//                         <p className="text-gray-700"></p>
//                       </motion.div>
//                     </div>

//                     <h2 className="text-white text-xl font-semibold text-center">
//                       {card.name}
//                     </h2>
//                   </div>
//                 ))}
//               </div>
// <div className=" mt-14">
//   <h1 className="text-white text-center text-2xl font-semibold">
//     Your Love Card:-{selectedCards[0].name}
//   </h1>
//   <Center>
//     <div className="w-[70%]">
//       <Divider />
//     </div>
//   </Center>
//   <BackToTopButton />
//   <div className="mt-4">
//     <div className="flex justify-center">
//       <motion.div
//         initial={{ opacity: 0, rotateY: 180 }}
//         animate={{ opacity: 1, rotateY: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-lg lg:w-[15%] w-[40%] md:w-[25%] mb-2 lg:h-[40vh] h-[21vh]"
//       >
//         <h2 className="text-2xl font-bold "></h2>
//         <p className="text-gray-700"></p>
//       </motion.div>
//     </div>

//     <h2 className="text-white text-xl font-semibold text-center">
//       {selectedCards[0].name}
//     </h2>
//     <div className="flex justify-center text-white">
//       <div className="w-[70%] lg:w-[50%]flex flex-col justify-center">
//         <h3 className="text-2xl font-semibold">Love</h3>
//         <p>{data.love}</p>
//       </div>
//     </div>
//   </div>
// </div>
// <div className=" mt-14">
//   <h1 className="text-white text-center text-2xl font-semibold">
//     Your Career Card:-{selectedCards[1].name}
//   </h1>
//   <Center>
//     <div className="w-[70%]">
//       <Divider />
//     </div>
//   </Center>

//   <div className="mt-4">
//     <div className="flex justify-center">
//       <motion.div
//         initial={{ opacity: 0, rotateY: 180 }}
//         animate={{ opacity: 1, rotateY: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-lg lg:w-[15%] w-[40%] md:w-[25%] mb-2 lg:h-[40vh] h-[21vh]"
//       >
//         <h2 className="text-2xl font-bold "></h2>
//         <p className="text-gray-700"></p>
//       </motion.div>
//     </div>

//     <h2 className="text-white text-xl font-semibold text-center">
//       {selectedCards[1].name}
//     </h2>
//     <div className="flex justify-center text-white">
//       <div className="w-[70%] lg:w-[50%]flex flex-col justify-center">
//         <h3 className="text-2xl font-semibold">Career</h3>
//         <p>{data.career}</p>
//       </div>
//     </div>
//   </div>
// </div>{" "}
// <div className=" mt-14">
//   <h1 className="text-white text-center text-2xl font-semibold">
//     Your Finance Card:-{selectedCards[2].name}
//   </h1>
//   <Center>
//     <div className="w-[70%]">
//       <Divider />
//     </div>
//   </Center>

//   <div className="mt-4">
//     <div className="flex justify-center">
//       <motion.div
//         initial={{ opacity: 0, rotateY: 180 }}
//         animate={{ opacity: 1, rotateY: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white rounded-lg lg:w-[15%] w-[40%] md:w-[25%] mb-2 lg:h-[40vh] h-[21vh]"
//       >
//         <h2 className="text-2xl font-bold "></h2>
//         <p className="text-gray-700"></p>
//       </motion.div>
//     </div>

//     <h2 className="text-white text-xl font-semibold text-center">
//       {selectedCards[2].name}
//     </h2>
//     <div className="flex justify-center text-white mb-10">
//       <div className="w-[70%] lg:w-[50%]flex flex-col justify-center">
//         <h3 className="text-2xl font-semibold">Finance</h3>
//         <p>{data.finance}</p>
//       </div>
//     </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <Box className=" w-full ">
//               {tarotCards.map((card, index) => (
//                 <Image
//                   key={index}
//                   onClick={() => handleCardClick(index, card)}
//                   src={tarotCard}
//                   height={{ base: 200, lg: 260 }}
//                   pos={"absolute"}
//                   style={{
//                     left: `${index * 25}px`,
//                   }}
//                   m={{ base: 50 }}
//                   ms={{
//                     base: "15%",
//                     sm: "35%",
//                     md: "36%",
//                     xl: "40%",
//                   }}
//                   className={`transition-transform cursor-pointer duration-500 ease-in-out  ${
//                     selectedCards.some(
//                       (selectedCard) => selectedCard.id === card.id
//                     )
//                       ? " -translate-y-8 "
//                       : ""
//                   }`}
//                 />
//               ))}
//             </Box>
//           )}
//         </div>
//         <Box
//           as={"h2"}
//           className="text-center relative   text-xl text-white font-nunito-light m-3"
//           top={{
//             base: "13em",
//             sm: "14em", // ~480px. em is a relative unit and is dependant on the font size.
//             md: "14em", // ~768px
//             lg: "20em", // ~992px
//             xl: "16em", // ~1280px
//           }}
//         >
//           {selectedCards.length < 3 && " Open your Card"}
//         </Box>
//       </Box>
//     </>
//   );
// }

// Assuming you have a BackToTopButton component

export default function DailyTarot() {
  const [data, setData] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [random, setRandom] = useState(Math.floor(Math.random() * 70));
  const [tarotCards, setTarotCards] = useState([]);

  useEffect(() => {
    axios
      .get("https://paste.soulharsh007.dev/ce48117.json")
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const storedSelectedCards = JSON.parse(
      localStorage.getItem("selectedCards")
    );
    if (storedSelectedCards) {
      setSelectedCards(storedSelectedCards);
    }
  }, []);

  useEffect(() => {
    setTarotCards(cards.slice(random, random + 7));
    console.log(tarotCards, "tarot cards");
    getCards();
  }, [random, cards]);

  const getCards = () => {
    axios
      .get(
        `https://paste.soulharsh007.dev/f01e4b0.json?love=${selectedCards[0]?.id}&career=${selectedCards[1]?.id}&finance=${selectedCards[2]?.id}`
      )
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleCardClick = (id) => {
    if (selectedCards.length >= 3) {
      message.error("Can't Add More than three cards");
      return;
    }

    const isCardSelected = selectedCards.some(
      (card) => card.id === tarotCards[id]?.id
    );

    if (!isCardSelected && selectedCards.length < 3) {
      const newSelectedCards = [
        ...selectedCards,
        { ...tarotCards[id], selected: true },
      ];
      setSelectedCards(newSelectedCards);
      localStorage.setItem("selectedCards", JSON.stringify(newSelectedCards));
    } else if (isCardSelected) {
      const updatedSelectedCards = selectedCards.filter(
        (card) => card.id !== tarotCards[id]?.id
      );
      setSelectedCards(updatedSelectedCards);
      localStorage.setItem(
        "selectedCards",
        JSON.stringify(updatedSelectedCards)
      );
    }
  };

  return (
    <>
      <Box className="h-full">
        <h1 className="text-center text-white lg:text-2xl font-nunito-light">
          Find Out Your Card of The Day
        </h1>
        {selectedCards.length === 3 && (
          <h2 className="text-center text-xl font-nunito-light text-white">
            Selected Cards
          </h2>
        )}
        <div className="">
          {selectedCards.length === 3 ? (
            <div className="">
              <div className="flex flex-wrap mt-5 justify-between lg:m-4 me-2 ms-2">
                {selectedCards?.map((card) => (
                  <div key={card.id} className="w-[30%]">
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, rotateY: 180 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg lg:w-[50%] w-[100%] md:w-[80%] lg:h-[40vh] h-[21vh]"
                      >
                        <h2 className="text-2xl font-bold "></h2>
                        <p className="text-gray-700"></p>
                      </motion.div>
                    </div>

                    <h2 className="text-white text-xl font-semibold text-center">
                      {card.name}
                    </h2>
                  </div>
                ))}
              </div>
              <div className=" mt-14">
                <h1 className="text-white text-center text-2xl font-semibold">
                  Your Love Card:-{selectedCards[0].name}
                </h1>
                <Center>
                  <div className="w-[70%]">
                    <Divider />
                  </div>
                </Center>
                <BackToTopButton />
                <div className="mt-4">
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, rotateY: 180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg lg:w-[15%] w-[40%] md:w-[25%] mb-2 lg:h-[40vh] h-[21vh]"
                    >
                      <h2 className="text-2xl font-bold "></h2>
                      <p className="text-gray-700"></p>
                    </motion.div>
                  </div>

                  <h2 className="text-white text-xl font-semibold text-center">
                    {selectedCards[0].name}
                  </h2>
                  <div className="flex justify-center text-white">
                    <div className="w-[70%] lg:w-[50%]flex flex-col justify-center">
                      <h3 className="text-2xl font-semibold">Love</h3>
                      <p>{data.love}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" mt-14">
                <h1 className="text-white text-center text-2xl font-semibold">
                  Your Career Card:-{selectedCards[1].name}
                </h1>
                <Center>
                  <div className="w-[70%]">
                    <Divider />
                  </div>
                </Center>

                <div className="mt-4">
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, rotateY: 180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg lg:w-[15%] w-[40%] md:w-[25%] mb-2 lg:h-[40vh] h-[21vh]"
                    >
                      <h2 className="text-2xl font-bold "></h2>
                      <p className="text-gray-700"></p>
                    </motion.div>
                  </div>

                  <h2 className="text-white text-xl font-semibold text-center">
                    {selectedCards[1].name}
                  </h2>
                  <div className="flex justify-center text-white">
                    <div className="w-[70%] lg:w-[50%]flex flex-col justify-center">
                      <h3 className="text-2xl font-semibold">Career</h3>
                      <p>{data.career}</p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className=" mt-14">
                <h1 className="text-white text-center text-2xl font-semibold">
                  Your Finance Card:-{selectedCards[2].name}
                </h1>
                <Center>
                  <div className="w-[70%]">
                    <Divider />
                  </div>
                </Center>

                <div className="mt-4">
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, rotateY: 180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg lg:w-[15%] w-[40%] md:w-[25%] mb-2 lg:h-[40vh] h-[21vh]"
                    >
                      <h2 className="text-2xl font-bold "></h2>
                      <p className="text-gray-700"></p>
                    </motion.div>
                  </div>

                  <h2 className="text-white text-xl font-semibold text-center">
                    {selectedCards[2].name}
                  </h2>
                  <div className="flex justify-center text-white mb-10">
                    <div className="w-[70%] lg:w-[50%]flex flex-col justify-center">
                      <h3 className="text-2xl font-semibold">Finance</h3>
                      <p>{data.finance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Box className=" w-full ">
              {tarotCards.map((card, index) => (
                <Image
                  key={index}
                  onClick={() => handleCardClick(index)}
                  src={tarotCard}
                  height={{ base: 200, lg: 260 }}
                  pos={"absolute"}
                  style={{
                    left: `${index * 25}px`,
                  }}
                  m={{ base: 50 }}
                  ms={{
                    base: "15%",
                    sm: "35%",
                    md: "36%",
                    xl: "40%",
                  }}
                  className={`transition-transform cursor-pointer duration-500 ease-in-out  ${
                    selectedCards.some(
                      (selectedCard) => selectedCard.id === card.id
                    )
                      ? " -translate-y-8 "
                      : ""
                  }`}
                />
              ))}
            </Box>
          )}
        </div>
        {/* Rest of your component remains unchanged */}
      </Box>
    </>
  );
}
