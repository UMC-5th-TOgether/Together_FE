import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import imgA from "../assets/ex1.jpg";
import imgB from "../assets/ex2.jpg";
import imgC from "../assets/ex3.jpg";
import imgD from "../assets/ex4.jpg";
import imgE from "../assets/ex5.jpg";
import imgF from "../assets/ex6.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../style/BannerStyle.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="controls-container">
        <h2 className="heading">지금 가장 HOT한 모임 글</h2>
        <p className="subheading">데이터받을 제목 2줄로</p>
        <p className="tags">태그 이미지 추가(데이터)</p>
        <div className="navigation-buttons">
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
      <div className="slides-container">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "bullets",
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slide-image-container">
              <img src={imgA} width="400" height="400" alt="testA" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image-container">
              <div>
                <img src={imgB} width="400" height="400" alt="testA" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image-container">
              <div>
                <img src={imgC} width="400" height="400" alt="testA" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image-container">
              <div>
                <img src={imgD} width="400" height="400" alt="testA" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image-container">
              <div>
                <img src={imgE} width="400" height="400" alt="testA" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image-container">
              <div>
                <img src={imgF} width="400" height="400" alt="testA" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
