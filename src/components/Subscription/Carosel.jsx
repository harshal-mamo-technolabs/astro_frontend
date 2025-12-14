import subscription from "../../assets/natalimg.png";
import subscription0 from "../../assets/horoscope.png";
import subscription1 from "../../assets/compantibility.png";
import subscription2 from "../../assets/Numerlogyimg.png";
import tarotimg from "../../assets/tarocrcsl.png";
import transit from "../../assets/transit.png";

import "../Subscription/Card.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function ImageCarosel() {
  const [swiper, setSwiper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiper !== null) {
        if (swiper.isEnd) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [swiper]);
  return (
    <>
      <div>
        <div className="flex gap-3 lg:text-3xl z-10 absolute m-2 text-2xl pb-3  bg-[#081132] text-white">
          <AiOutlineLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        </div>
        <Swiper
          style={{
            "--swiper-pagination-color": "#5f66fd",
            "--swiper-pagination-bullet-inactive-color": "#ffff",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
          spaceBetween={30}
          onSwiper={setSwiper}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className=" bg-[#081132]"
        >
          <SwiperSlide>
            <div className=" flex flex-col items-center gap-0 ">
              <div>
                <Image
                  src={subscription0}
                  height={{ base: 280, lg: 250, md: 400 }}
                />
              </div>
              <div className="">
                <h2 className=" lg:ms-5 lg:text-2xl font-sans md:text-4xl text-white ">
                  Unlimited Horoscope
                </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" flex flex-col items-center gap-0 ">
              <div>
                <Image
                  src={subscription}
                  height={{ base: 280, lg: 250, md: 400 }}
                />
              </div>
              <div className="">
                <h2 className=" lg:ms-5 lg:text-2xl font-sans md:text-4xl text-white ">
                  Natal Report
                </h2>
              </div>
            </div>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <div className=" flex flex-col items-center gap-0 ">
              <div>
                <Image
                  src={subscription1}
                  height={{ base: 280, lg: 250, md: 400 }}
                />
              </div>
              <div className="relative">
                <h2 className=" text-center lg:ms-5 lg:text-2xl font-sans md:text-4xl text-white ">
                  Compatibility reports
                </h2>
              </div>
            </div>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <div className=" flex flex-col items-center gap-0 ">
              <div className="mt-4">
                <Image
                  src={subscription2}
                  height={{ base: 260, lg: 250, md: 400 }}
                />
              </div>
              <div className="relative bottom-5 m-3">
                <h2 className=" lg:ms-5 lg:text-2xl mt-1 font-sans md:text-4xl text-white ">
                  Numerology
                </h2>
              </div>
            </div>
          </SwiperSlide>{" "}
          <SwiperSlide>
            <div className=" flex flex-col items-center gap-0  ">
              <div>
                <Image
                  src={tarotimg}
                  height={{ base: 260, lg: 250, md: 400 }}
                />
              </div>
              <div className="">
                <h2 className=" lg:ms-5 lg:text-2xl mt-4 font-sans md:text-4xl text-white ">
                  Tarot Prediction
                </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" flex flex-col items-center gap-0  ">
              <div>
                <Image src={transit} height={{ base: 260, lg: 250, md: 400 }} />
              </div>
              <div className="">
                <h2 className=" lg:ms-5 mt-2 lg:text-2xl font-sans md:text-4xl text-white ">
                  Numerology predictions
                </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default ImageCarosel;
