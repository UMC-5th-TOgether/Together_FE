import React from "react";
import ReviewCard from "./ReviewCard";
import "./ReviewSlide.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard1 from "./ReviewCard1";
import ReviewCard2 from "./ReviewCard2";
import ReviewCard3 from "./ReviewCard3";
import ReviewCard4 from "./ReviewCard4";
import ReviewCard5 from "./ReviewCard5";

export default function ReviewSlide() {
  const ARRAY = [0, 1, 2, 3, 4];
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3.28,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider className="ReviewSlide-container" {...settings}>
      <ReviewCard />
      <ReviewCard1 />
      <ReviewCard2 />
      <ReviewCard3 />
      <ReviewCard4 />
      <ReviewCard5 />
    </Slider>
  );
}
