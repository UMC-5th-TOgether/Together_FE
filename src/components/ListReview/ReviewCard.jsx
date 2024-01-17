import React from "react";
import "./ReviewCard.css";
import profileImg from "../../assets/profile.png";
import fullStarImg from "../../assets/fullstar.png";
//UserIconImg server에게 get,post 요청 해서 이미지 받아야함.

export default function ReviewCard() {
  return (
    <div className="ReviewBox">
      <div className="Contents">
        <div className="UserBox">
          <img src={profileImg} alt="profile" />
          <div className="UserDetailBox">
            <div className="UserName">naningu</div>
            <div className="CategoryBox">
              <div className="CategoryHash">#에스파</div>
              <div className="CategoryHash">#에스파</div>
              <div className="CategoryHash">#에스파</div>
            </div>
            <div className="StarBox">
              <img src={fullStarImg} alt="fullstar" />
              <div className="Point">5</div>
            </div>
          </div>
        </div>
        <div className="UserReviewBox">
          처음에는 어색할까봐 걱정했지만, 공통된 취향과 관심사를 가진 사람들과
          매칭되어 함께 다양한 활동을 즐길 수 있었어요!
        </div>
      </div>
    </div>
  );
}
