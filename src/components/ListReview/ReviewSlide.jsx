import React from "react";
import ReviewCard from "./ReviewCard";
import "./ReviewSlide.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      {ARRAY.map((arr, idx) => (
        <ReviewCard key={idx} />
      ))}
    </Slider>
  );
}
