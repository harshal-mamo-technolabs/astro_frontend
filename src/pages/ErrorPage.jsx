import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-gray-600">
            we are sorry, but an unexpected error occurred. Please try again
            later.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
