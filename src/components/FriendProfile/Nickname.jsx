import React from "react";
import usersData from "../../data/UserProfileData.json"; // Ensure this path is correct
import defaultAvatar from "../../assets/프로필.png"; // Ensure this path is correct
import "../../style/NicknameStyle.css"; // Ensure this path is correct

const Nickname = () => {
  // Assuming we are displaying the first user's data; adjust as needed
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
