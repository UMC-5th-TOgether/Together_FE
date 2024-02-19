import React, { useState } from "react";
import "./ReviewCard.css";
import profileImg from "../../assets/프로필.png";
import fullStarImg from "../../assets/fullstar.png";
import emptyStarImg from "../../assets/emptystar.png";
//UserIconImg server에게 get,post 요청 해서 이미지 받아야함.

export default function ReviewCard2() {
  const ReviewsData = [
    {
      pimg: profileImg,
      alt: "prfileImg",
      name: "생각하는 쿼카",
      tags: ["#전시회", "#성수", "#예술"],
      average: 5,
      review:
        "사람마다 관심사가 다르니 친구들에게 함께 가자고 선뜻 권하기가 어려웠는데 투게더로 관심사가 비슷한 사람과 동행하고 같은 주제로 대화를 나눌 수 있었서 좋아요.",
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
