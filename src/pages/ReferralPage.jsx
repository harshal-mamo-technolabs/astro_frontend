import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  CopyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import bg from "../assets/bg.mp4";

import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ZodiacNav from "../components/More_detail/ZodiacNav";
import ZodiacAvatar from "../components/More_detail/ZodiacAvatar";
import { Button, Card } from "antd";
import { useState } from "react";
import RefralTable from "../components/RefralTable";
const ReferralPage = () => {
  const [copy, setCopy] = useState("Copy");
  const referralLink = "https://example.com/referral?code=12345";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopy("Copied");
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen   text-white">
      <video
        autoPlay
        muted
        loop
        className="object-cover w-full min-h-screen h-full fixed top-0 left-0 z-[-1]"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <Box className="lg:p-3">
        <Navbar />
      </Box>{" "}
      <span className="lg:hidden md:hidden">
        <ZodiacNav />
      </span>{" "}
      <span className="lg:hidden">
        <ZodiacAvatar />
      </span>
      <div className="flex items-center">
        <div className="w-full text-2xl flex items-center ">
          <Link onClick={() => navigate(-1)} className="cursor-pointer">
            <div className=" relative  ">
              <ArrowLeftOutlined className=" m-1 text-3xl" />
            </div>
          </Link>

          <h3 className="text-center w-full text-2xl  relative top-2 lg:top-0"></h3>
        </div>
      </div>
      <div>
        <h2 className="text-center mt-4">Share the referral link</h2>
      </div>
      <div className="flex justify-center mb-4">
        <div className=" p-4 rounded-lg mb-4  flex">
          <span className="border p-2 ">{referralLink}</span>
          <Button
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
            className=" bg-blue-600 text-white ms-3 rounded-lg "
            disabled={!referralLink}
          >
            {copy}
          </Button>
        </div>
      </div>
      <div className="ms-2 me-2">
        <div className="flex justify-center">
          <Card className="mb-4  lg:w-[20%] w-[60%] text-white  bg-gradient-to-r from-indigo-700 to-purple-600">
            <p className="text-white text-xl">Total Referrals</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <UserOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
              <span style={{ fontSize: "18px" }}>30</span>
            </div>
          </Card>
        </div>

        <h1 className="text-xl font-bold text-center mt-4">Your Referrals</h1>
        <div className="flex justify-center ">
          {/* <Table
            className="mb-4 lg:w-[70%]"
            columns={columns}
            dataSource={referredUsers}
            headerColor="rgba(0, 0, 0, 0.88)"
            pagination={false}
          /> */}
          <RefralTable />
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
