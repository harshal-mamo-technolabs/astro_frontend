import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const step = [
  { title: "", description: "" },
  { title: "", description: "" },
  { title: "", description: "" },
];

function CheckoutSteps({ current }) {
  const { activeStep } = useSteps({
    index: current,
    count: current,
  });

  return (
    <div className="flex justify-center">
      <Stepper index={activeStep} className="mt-5 w-[90%] lg:w-[70%]">
        {step.map((step, index) => (
          <Step key={index} className="text-white">
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
export default CheckoutSteps;
