import React from "react";
import usersData from "../../data/UserProfileData.json";
import defaultAvatar from "../../assets/프로필.png";
import "../../style/NicknameStyle.css";

const Nickname = () => {
  const { image, nickname, introduction } = usersData[0];

  return (
    <div className="nickname-container">
      <div className="avatar-container">
        <img
          src={image || defaultAvatar}
          alt={`Profile of ${nickname}`}
          className="profile-avatar"
        />
      </div>
      <h1 className="nickname">{nickname}</h1>
      <p className="introduction">{introduction}</p>
    </div>
  );
};

export default Nickname;
