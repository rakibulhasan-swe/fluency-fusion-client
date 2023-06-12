import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";

const Slider = () => {
  return (
    <div>
      <Swiper
        style={{ maxHeight: "100vh" }}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="img-fluid" src={banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-fluid" src={banner2} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-fluid" src={banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="img-fluid" src={banner2} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
