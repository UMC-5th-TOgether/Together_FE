import React, { useState } from "react";
import "./ReviewCard.css";
import profileImg from "../../assets/프로필.png";
import fullStarImg from "../../assets/fullstar.png";
import emptyStarImg from "../../assets/emptystar.png";
//UserIconImg server에게 get,post 요청 해서 이미지 받아야함.

export default function ReviewCard5() {
  const ReviewsData = [
    {
      pimg: profileImg,
      alt: "prfileImg",
      name: "펭글링",
      tags: ["#국내", "#단기여행", "#동행"],
      average: 5,
      review:
        "국내여행도 동행을 구하면 재밌을 것 같다고 생각했는데 투게더가 그걸 이루게 해줬어요!",
    },
  ];

  const [Slideindex, setSlideindex] = useState(0);

  const ratingToPercent = {
    width: `${ReviewsData[Slideindex].average * 15.5 + 5}%`,
  };
  return (
    <div className="ReviewBox">
      <div className="Contents">
        <div className="UserBox">
          <img
            src={ReviewsData[Slideindex].pimg}
            alt={ReviewsData[Slideindex].alt}
          />
          <div className="UserDetailBox">
            <div className="UserName">{ReviewsData[Slideindex].name}</div>
            <div className="CategoryBox">
              {ReviewsData[Slideindex].tags.map((tag, idx) => (
                <div className="CategoryHash" key={idx}>
                  {tag}
                </div>
              ))}
            </div>
            <div className="StarBox">
              <div className="star-ratings-fill" style={ratingToPercent}>
                <img src={fullStarImg} alt="fullstar" />
                <img src={fullStarImg} alt="fullstar" />
                <img src={fullStarImg} alt="fullstar" />
                <img src={fullStarImg} alt="fullstar" />
                <img src={fullStarImg} alt="fullstar" />
              </div>
              <div className="star-rating-base">
                <img src={emptyStarImg} alt="emptystar" />
                <img src={emptyStarImg} alt="emptystar" />
                <img src={emptyStarImg} alt="emptystar" />
                <img src={emptyStarImg} alt="emptystar" />
                <img src={emptyStarImg} alt="emptystar" />
              </div>
              <div className="Point">{ReviewsData[Slideindex].average}</div>
            </div>
          </div>
        </div>
        <div className="UserReviewBox">{ReviewsData[Slideindex].review}</div>
      </div>
    </div>
  );
}
