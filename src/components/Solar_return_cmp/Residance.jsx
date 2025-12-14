import { Box } from "@chakra-ui/react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState } from "react";
import { useTranslatedText } from "../../hooks/useTranslatedText";
dayjs.extend(customParseFormat);

const Residance = () => {
  const [startDate, setStartDate] = useState(new Date());
  const maxAllowedDate = new Date();
  maxAllowedDate.setHours(0, 0, 0, 0);

  const currentResidenceText = useTranslatedText("Current Residence");

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <p className="w-fit " onClick={onClick} ref={ref}>
      {value}
    </p>
  ));
  ExampleCustomInput.displayName = "ExampleCustomInput";
  return (
    <div>
      <div className="flex justify-around mt-5 gap-4">
        <Box className="flex w-full gap-5 justify-center items-center">
          <Box
            className="flex justify-around bg-[#33175b] p-2 rounded-md cursor-pointer"
            w={{ lg: "20rem" }}
          >
            <h2 className="text-white text-2xl">Antonio kundih</h2>
          </Box>
          <Box className="flex justify-around bg-[#33175b]  lg:w-[30%] p-2 lg:p-0 md:p-1  border-none text-white h-fit rounded-md cursor-pointer">
            <div className="p-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
                maxDate={maxAllowedDate}
                piker="small"
              />
            </div>
          </Box>
        </Box>
      </div>

      <div className="flex justify-center items-center text-white pt-10 align-middle gap-5 flex-wrap">
        <h2 className="text-2xl">{currentResidenceText}</h2>
        <Box
          className="flex justify-around bg-[#33175b] p-2 rounded-md cursor-pointer"
          w={{ lg: "27rem" }}
        >
          <div>
            <h2 className="text-white">Osjek, Baranja, Croatia</h2>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Residance;
