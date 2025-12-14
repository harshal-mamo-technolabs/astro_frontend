// // ... (import statements)

// import { Box, Select } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import "../Preloader/Preloader.css";
// import { AiOutlineLeft } from "react-icons/ai";
// const Step2 = ({ step2Data, prev }) => {
//   const days = Array.from({ length: 31 }, (_, i) => i + 1);
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const years = [
//     1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2008, 2009, 2010,
//     2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
//     2023,
//   ];

//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");

//   useEffect(() => {
//     step2Data(selectedDay, selectedMonth, selectedYear);
//   }, [selectedDay, selectedMonth, selectedYear, step2Data]);

//   return (
//     <div className="bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-lg text-[#9e9e9f]  step2 font-nunito-light step2  p-2">
//       <Box h="10px" w="20%" className="bg-custom-gradient " />
//       <div onClick={() => prev()}>
//         <span className="flex items-center gap-3 text-2xl text-[#9e9e9f] font-nunito-light cursor-pointer ">
//           <AiOutlineLeft className="mt-1 " />
//           <h3>BACK</h3>
//         </span>
//       </div>
//       <div className=" flex flex-col justify-center items-center mt-10 gap-5 custom">
//         <h1 className="lg:text-4xl md:text-4xl font-['Times New Roman'] text-2xl">
//           What is your date of birth?
//         </h1>
//         <p className="lg:text-2xl md:text-4xl text-xl m-2 font-[helvetica] text-center">
//           The foundation of your Birth Chart Reading is <br />
//           <span className="text-center lg:ms-20">
//             of course your date of birth
//           </span>
//         </p>
//         <div className="mb-5 flex gap-3">
//           <div>
//             <Select
//               placeholder="day"
//               value={selectedDay}
//               onChange={(e) => setSelectedDay(e.target.value)}
//             >
//               {days.map((day) => (
//                 <option key={day} value={day}>
//                   {day}
//                 </option>
//               ))}
//             </Select>
//           </div>
//           <div>
//             <Select
//               placeholder="month"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//             >
//               {months.map((month) => (
//                 <option key={month} value={month}>
//                   {month}
//                 </option>
//               ))}
//             </Select>
//           </div>
//           <div>
//             <Select
//               placeholder="Year"
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//             >
//               {years.map((yr) => (
//                 <option key={yr} value={yr}>
//                   {yr}
//                 </option>
//               ))}
//             </Select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2;

// import { Box, Select, useToast } from "@chakra-ui/react";
// import { useState } from "react";
// import { AiOutlineLeft } from "react-icons/ai";
// import { useProfile } from "../../context/Profile";

// const Step2 = ({ prev, current, setCurrent }) => {
//   const toast = useToast();

//   const days = Array.from({ length: 31 }, (_, i) => i + 1);
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const years = [
//     1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2008, 2009, 2010,
//     2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
//     2023,
//   ];

//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const { formData, setFormData } = useProfile();
//   // useEffect(() => {
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     step2: { selectedDay, selectedMonth, selectedYear },
//   //   }));
//   // }, [selectedDay, selectedMonth, selectedYear]);

//   const next = () => {
//     if (!selectedDay || !selectedMonth || !selectedYear) {
//       toast({
//         position: "top",
//         duration: 2000,
//         render: () => (
//           <Box
//             color="white"
//             p={3}
//             className=" bg-custom-gradient font-nunito-light text-center rounded-md"
//           >
//             All fields required
//           </Box>
//         ),
//       });
//     } else {
//       setCurrent(current + 1);
//       setFormData((prevData) => ({
//         ...prevData,
//         step2: { day: selectedDay, month: selectedMonth, year: selectedYear },
//       }));
//     }
//   };

//   // const [selectedMonth, setSelectedMonth] = useState("");
//   // const [selectedYear, setSelectedYear] = useState("");

//   // useEffect(() => {
//   //   step2Data(selectedDay, selectedMonth, selectedYear);
//   // }, [selectedDay, selectedMonth, selectedYear, step2Data]);

//   return (
//     <div className=" bg-[#1a102e] backdrop-blur-md bg-opacity-70 webkit-backdrop-blur-md rounded-lg  text-[#9e9e9f] font-nunito-light   p-2">
//       <Box h="10px" w="10%" className="bg-custom-gradient" />

//       <div onClick={() => prev()}>
//         <span className="flex items-center gap-3 text-2xl text-[#9e9e9f] font-nunito-light cursor-pointer ">
//           <AiOutlineLeft className="mt-1 " />
//           <h3>BACK</h3>
//         </span>
//       </div>
//       <div className="flex flex-col justify-center items-center gap-5">
//         <h1 className="lg:text-4xl md:text-4xl font-['Times New Roman'] text-2xl mt-5">
//           What is your date of birth?
//         </h1>

//         <p className="lg:text-2xl md:text-2xl text-lg m-2 font-[helvetica] text-center">
//           The foundation of your Birth Chart Reading is <br />
//           <span className="text-center lg:ms-20">
//             of course your date of birth
//           </span>
//         </p>

//         <div className="flex  gap-5">
//           <div>
//             <Select
//               placeholder="day"
//               value={selectedDay}
//               onChange={(e) => setSelectedDay(e.target.value)}
//             >
//               {days.map((day) => (
//                 <option key={day} value={day}>
//                   {day}
//                 </option>
//               ))}
//             </Select>
//           </div>
//           <div>
//             <Select
//               placeholder="Month"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//             >
//               {months.map((day) => (
//                 <option key={day} value={day}>
//                   {day}
//                 </option>
//               ))}
//             </Select>
//           </div>{" "}
//           <div>
//             <Select
//               placeholder="Year"
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//             >
//               {years.map((day) => (
//                 <option key={day} value={day}>
//                   {day}
//                 </option>
//               ))}
//             </Select>
//           </div>
//         </div>
//         <button
//           className={`w-[30%] mt-5 rounded-full text-white font-light m-6
//                    text-xl  p-1 lg:p-4  font-[helvetica]  bg-gradient-to-r from-purple-600 to-indigo-700`}
//           onClick={() => next()}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step2;
