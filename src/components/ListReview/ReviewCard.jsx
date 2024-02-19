import React from "react";
import "./ReviewCard.css";
import profileImg from "../../assets/프로필.png";
import fullStarImg from "../../assets/fullstar.png";
import emptyStarImg from "../../assets/emptystar.png";

export default function ReviewCard() {
  const ReviewsData = [
    {
      pimg: profileImg,
      alt: "prfileImg",
      name: "hihihi",
      tags: ["#줌 스터디", "#공부", "#카페"],
      average: 5,
      review:
        "이런 서비스를 쓸 때 어떤 사람들을 만나게 될지 몰라서 처음에는 솔직히 걱정스러웠지만 이젠 부담감 없이 사용할 수 있어요.",
    },
  ];

  const ratingToPercent = {
    width: `${ReviewsData[0].average * 15.5 + 5}%`,
  };
  return (
    <div className="ReviewBox">
      <div className="Contents">
        <div className="UserBox">
          <img src={ReviewsData[0].pimg} alt={ReviewsData[0].alt} />
          <div className="UserDetailBox">
            <div className="UserName">{ReviewsData[0].name}</div>
            <div className="CategoryBox">
              {ReviewsData[0].tags.map((tag, idx) => (
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
              <div className="Point">{ReviewsData[0].average}</div>
            </div>
          </div>
        </div>
        <div className="UserReviewBox">{ReviewsData[0].review}</div>
      </div>
    </div>
  );
}
