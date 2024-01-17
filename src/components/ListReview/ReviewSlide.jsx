import React from "react";
import ReviewCard from "./ReviewCard";
import "./ReviewSlide.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewSlide() {
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
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </Slider>
  );
}
