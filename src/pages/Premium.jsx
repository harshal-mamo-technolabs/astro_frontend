import { useEffect, useState } from "react";
import PlansPage from "./PlansPage/PlansPage";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

const PremiumPage = () => {
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [loader, setLoader] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    const fetchData = async () => {
      try {
        // If token exists, verify it first
        if (token) {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}users/verify-token`,
            { token },
            { withCredentials: true }
          );
        }

        // Then fetch subscription info
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}subscriptions`,
          { withCredentials: true }
        );
        setSubscriptionInfo(response.data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div>
      <Spin
        spinning={loader}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
              fontWeight: "bold",
            }}
            spin
          />
        }
      >
        <PlansPage subscriptionInfo={subscriptionInfo} loader={loader} />
      </Spin>
    </div>
  );
};

export default PremiumPage;
