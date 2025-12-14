import {
  Button,
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
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { useProfile } from "../../context/Profile";

const Addnewprofile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { newProfile, setNewProfile } = useProfile();

  const AddNewProfile = (profile) => {
    setNewProfile([...newProfile, profile]);
    reset()
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-600">
      <ModalOverlay />
      <ModalContent className="bg-red-700">
        <ModalHeader className="text-center">Add New Profile</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(AddNewProfile)}>
            <Stack direction="row">
              <Radio
                value="male"
                {...register("gender", {
                  required: "Please select a gender",
                })}
              >
                Male
              </Radio>
              <Radio
                value="female"
                {...register("gender", {
                  required: "Please select a gender",
                })}
              >
                Female
              </Radio>
            </Stack>
            <FormErrorMessage>
              {errors.gender && errors.gender.message}
            </FormErrorMessage>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.username}>
                <FormLabel>Username:</FormLabel>
                <Input
                  placeholder="Enter Profile Name"
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
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={CalendarIcon} color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="date"
                    {...register("dob", {
                      required: "Date of Birth is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.dob && errors.dob.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.timeOfBirth}>
                <FormLabel>Time of Birth:</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={TimeIcon} color="gray.300" />
                  </InputLeftElement>
                  <Input
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
                  placeholder="Enter place where you were born"
                  {...register("placeOfBirth", {
                    required: "Place of Birth is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.placeOfBirth && errors.placeOfBirth.message}
                </FormErrorMessage>
              </FormControl>

              <ModalFooter>
                <Button
                  className="w-full rounded"
                  bg={"#9829ea"}
                  color={"white"}
                  fontSize={20}
                  mr={3}
                  type="submit"
                >
                  Save
                </Button>
              </ModalFooter>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </div>
  );
};

export default Addnewprofile;
