import React, { useState } from "react";
import "./ReviewCard.css";
import profileImg from "../../assets/프로필.png";
import fullStarImg from "../../assets/fullstar.png";
import emptyStarImg from "../../assets/emptystar.png";
//UserIconImg server에게 get,post 요청 해서 이미지 받아야함.

export default function ReviewCard3() {
  const ReviewsData = [
    {
      pimg: profileImg,
      alt: "prfileImg",
      name: "압구정불주먹",
      tags: ["#테니스", "#운동", "#내기"],
      average: 5,
      review:
        "투게더로 만난 사람들과 경쟁하며 새로운 인연을 맺고 함께 스포츠를 즐길 수 있어서 좋습니다. 하고 싶은 그 순간 사람을 모집할 수 있다는 것이 가장 큰 장점입니다.",
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
