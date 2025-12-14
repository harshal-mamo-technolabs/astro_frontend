import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-600 min-h-screen ">
      <div className=" ">
        <div className="flex gap-3 w-full text-2xl lg:text-3xl p-3  text-white">
          <ArrowLeftOutlined
            className="lg:mt-2 mt-2  cursor-pointer "
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full me-4 lg:me-6 ">
            <h2>Contact us</h2>
          </div>
        </div>
        <div className=" mt-10 m-4">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block  font-medium  text-white">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="xyz"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block  font-medium  text-white">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="xyz@gmail.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block  font-medium  text-white"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="enter your message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#9829ea] font-semibold w-[10rem] text-white rounded-full px-4 py-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
