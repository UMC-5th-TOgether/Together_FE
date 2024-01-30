import React, { useState } from "react";
import "./ReviewCard.css";
import profileImg from "../../assets/profile.png";
import fullStarImg from "../../assets/fullstar.png";
import emptyStarImg from "../../assets/emptystar.png";
//UserIconImg server에게 get,post 요청 해서 이미지 받아야함.

export default function ReviewCard() {
  const ReviewsData = [
    {
      Image: profileImg,
      alt: "prfileImg",
      name: "hihihi",
      tags: ["#줌 스터디", "#공부", "#카페"],
      score: 5,
      content:
        "이런 서비스를 쓸 때 어떤 사람들을 만나게 될지 몰라서 처음에는 솔직히 걱정스러웠지만 이젠 부담감 없이 사용할 수 있어요.",
    },
  ];

  const [Slideindex, setSlideindex] = useState(0);

  const ratingToPercent = {
    width: `${ReviewsData[Slideindex].score * 15.5 + 5}%`,
  };
  return (
    <div className="ReviewBox">
      <div className="Contents">
        <div className="UserBox">
          <img
            src={ReviewsData[Slideindex].Image}
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
              <div className="Point">{ReviewsData[Slideindex].score}</div>
            </div>
          </div>
        </div>
        <div className="UserReviewBox">{ReviewsData[Slideindex].content}</div>
      </div>
    </div>
  );
}
