import EditProfile from "../EditProfile/EditProfile";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { useTranslatedText } from "../../hooks/useTranslatedText";

const MyAccount = () => {
  const navigate = useNavigate();
  const personalInformationText = useTranslatedText("Personal Information");
  return (
    <div className="min-h-screen w-full text-white font-nunito-light bg-gradient-to-r from-indigo-700 to-purple-600">
      <div className="p-2">
        <div className="flex items-center gap-3 w-full p-3 bg-[#1a102e]">
          <LeftOutlined
            className="mt-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex justify-center w-full">
            <h2>{personalInformationText}</h2>
          </div>
        </div>
      </div>
      <EditProfile />
    </div>
  );
};

export default MyAccount;
