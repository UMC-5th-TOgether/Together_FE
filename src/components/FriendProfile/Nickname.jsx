import React from "react";
import usersData from "../../data/UserProfileData.json";
import defaultAvatar from "../../assets/프로필.png";
import fullStar from "../../assets/star.png";
import emptyStar from "../../assets/emptystar.png";
import "../../style/NicknameStyle.css";

const Nickname = () => {
  const { image, nickname, introduction, manners, location, sex, age } =
    usersData[0];
  const starView = {
    width: `${manners * 24}px`,
  };

  return (
    <div className="nickname-container">
      <div className="profile-container">
        <img
          src={image || defaultAvatar}
          alt={`Profile of ${nickname}`}
          className="profile-avatar"
        />
        <div className="profileDetail-container">
          <p className="nickname-font">
            {nickname} ({sex}/{age})
          </p>
          <p className="location">{location}</p>
          <p className="introduction">"{introduction}"</p>
        </div>
      </div>
      <div className="point-container">
        <div className="pointDetail-container">
          <p className="point-font">동행횟수</p>
          <p className="point-font2" style={{ marginLeft: "30px" }}>
            3명 중 2명의 이용자가 다시 만나고 싶어해요.
          </p>
        </div>
        <div className="pointDetail-container">
          <p className="point-font">매너 별점</p>
          <p className="point-font2">
            <div className="average-container" style={{ width: starView }}>
              <div className="full-star-box" style={starView}>
                <img src={fullStar} alt="fullstar"></img>
                <img src={fullStar} alt="fullstar"></img>
                <img src={fullStar} alt="fullstar"></img>
                <img src={fullStar} alt="fullstar"></img>
                <img src={fullStar} alt="fullstar"></img>
              </div>
              <div className="empty-star-box">
                <img src={emptyStar} alt="emptystar"></img>
                <img src={emptyStar} alt="emptystar"></img>
                <img src={emptyStar} alt="emptystar"></img>
                <img src={emptyStar} alt="emptystar"></img>
                <img src={emptyStar} alt="emptystar"></img>
              </div>
              <span style={{ marginLeft: "13px" }}>( {manners} )</span>
            </div>
          </p>
        </div>
        <div className="pointDetail-container">
          <p className="point-font">응답률</p>
          <p className="point-font2" style={{ marginLeft: "50px" }}>
            100%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nickname;
