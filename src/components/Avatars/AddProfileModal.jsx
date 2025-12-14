import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useProfile } from "../../context/Profile";
const AddProfileModal = () => {
  const { friendslist, setFriendslist } = useProfile();
  const { onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newdata = { ...data, id: Date.now() };
    setFriendslist([...friendslist, newdata]);
    reset();
    onClose();
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <ModalOverlay />
      <ModalContent className=" m-5 lg:m-0 md:m-0 bg-[#190C26]">
        <ModalHeader className="text-center text-white font-nunito-light bg-[#190C26]">
          Add Profile
        </ModalHeader>
        <ModalCloseButton className="text-white" />

        <ModalBody pb={6} className=" text-white bg-[#190C26]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.gender}>
                <label>
                  <input
                    type="radio"
                    value="male"
                    name="gender"
                    {...register("gender", {
                      required: "Please select a gender",
                    })}
                  />
                  Male
                </label>

                <label style={{ marginLeft: "5px" }}>
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    {...register("gender", {
                      required: "Please select a gender",
                    })}
                  />
                  Female
                </label>
               
                <FormErrorMessage>
                  {errors.gender && errors.gender.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.username}>
                <FormLabel>Username:</FormLabel>
                <Input
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  borderColor="#9e9e9f"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.dob}>
                <FormLabel>Date of Birth:</FormLabel>
                <InputGroup className="bg-white text-black rounded-md">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={CalendarIcon} color="gray.700" />
                  </InputLeftElement>
                  <Input
                    type="date"
                    {...register("dob", {
                      required: "Date of Birth is required",
                    })}
                    max={today}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.dob && errors.dob.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.timeOfBirth}>
                <FormLabel>Time of Birth:</FormLabel>
                <InputGroup className="bg-white text-black rounded-md">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={TimeIcon} color="gray.800" />
                  </InputLeftElement>
                  <Input
                    borderColor="#9e9e9f"
                    type="time"
                    {...register("timeOfBirth", {
                      required: "Time of Birth is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.timeOfBirth && errors.timeOfBirth.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.placeOfBirth}>
                <FormLabel>Place of Birth:</FormLabel>
                <Input
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  borderColor="#9e9e9f"
                  {...register("placeOfBirth", {
                    required: "Place of Birth is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.placeOfBirth && errors.placeOfBirth.message}
                </FormErrorMessage>
              </FormControl>

              <ModalFooter>
                {/* <Button className="w-full" mr={3} type="submit">
                    Save
                  </Button> */}
                <div className=" w-full flex justify-center">
                  <button className="w-full rounded-full font-nunito-light text-white font-light text-xl p-2 bg-[#9326DB]">
                    Save
                  </button>
                </div>
              </ModalFooter>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default AddProfileModal;
