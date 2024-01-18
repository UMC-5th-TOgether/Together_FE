import React from "react";
import { Link } from "react-router-dom";
import usersData from "../../data/UserProfileData.json";
import "../../style/FriendStyle.css";

const UserProfile = ({ image, nickname, introduction }) => {
  return (
    <div className="user-profile">
      <div className="avatar-container">
        {image ? (
          <img src={image} alt={`Profile of ${nickname}`} className="avatar" />
        ) : null}
      </div>
      <div className="nickname">{nickname}</div>
      <div className="introduction">{introduction}</div>
    </div>
  );
};
const Friend = () => {
  return (
    <div className="app">
      <main>
        <section className="user-list">
          {usersData.map((user) => (
            <Link
              to={`/FriendProfile/${user.id}`}
              className="user-profile-link"
              key={user.id}
            >
              <UserProfile
                image={user.image}
                nickname={user.nickname}
                introduction={user.introduction}
              />
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Friend;
