import { useState } from "react";
import { Button, Steps, theme } from "antd";
import { useNavigate } from "react-router-dom";


const steps = [
  {
    content: "First-content",
  },
  {
    content: "Second-content",
  },
  {
    content: "Last-content",
  },
];
const Step = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} bg="red" items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button bg="blue" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button bg="green" onClick={() => navigate("/home")}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default Step;


  
