import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import imgA from "../assets/광고배너_이미지 01.png";
import imgB from "../assets/광고배너_이미지 02.png";
import imgC from "../assets/광고배너_이미지 03.png";
import imgD from "../assets/광고배너_이미지 04.png";
import imgE from "../assets/광고배너_이미지 05.png";

import BtnA from "../assets/카테고리 버튼_Default_공연.png";
import BtnB from "../assets/카테고리 버튼_Default_식사.png";
import BtnC from "../assets/카테고리 버튼_Default_취미.png";
import BtnD from "../assets/카테고리 버튼_Default_운동.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../style/BannerStyle.css";

const slidesData = [
  {
    img: imgA,
    alt: "testA",
    Tag: BtnA,
    title: "에스파 콘서트 MY DRAMA",
    subtitle: "같이 즐길 동행을 구해요!!",
    tags: ["#에스파", "#콘서트", "#경희대 평화의 전당"],
  },
  {
    img: imgB,
    alt: "testB",
    Tag: BtnB,
    title: "라이즈 팬미팅 같이가요!",
    subtitle: "같이가요!",
    tags: ["#팬미팅", "#라이즈", "#브리즈"],
  },
  {
    img: imgC,
    alt: "testC",
    Tag: BtnC,
    title: "트롤: 밴드 투게더",
    subtitle: "더빙판 같이 보러가요!",
    tags: ["#트롤:밴드 투게더", "#영화", "#더빙"],
  },
  {
    img: imgD,
    alt: "testC",
    Tag: BtnD,
    title: "서울라이트 작품보러",
    subtitle: "광화문 갈 사람~",
    tags: ["#광화문", "#미디어아트", "#Seoul Light"],
  },
  {
    img: imgE,
    alt: "testC",
    Tag: BtnB,
    title: "서울 강동구 스페이스파운틴",
    subtitle: "<JUNGKE CITY>",
    tags: ["#디자인 전시", "#JUNGLE CITY ", "#스페이스마운틴"],
  },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="banner-container">
      <div className="controls-container">
        <h3 className="Hot">
          지금 <a>HOT한</a> 모임글
        </h3>
        <h2 className="heading">{slidesData[activeSlide].title}</h2>
        <p className="subheading">{slidesData[activeSlide].subtitle}</p>
        <img
          src={slidesData[activeSlide].Tag}
          alt="Category"
          className="category-button"
        />
        <div className="tags">
          {slidesData[activeSlide].tags.map((tag, idx) => (
            <span className="tag" key={idx}>
              {tag}
            </span>
          ))}
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
      </div>

      <div className="slides-container">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={70}
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
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="mySwiper"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="slide-image-container">
                <img src={slide.img} alt={slide.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
