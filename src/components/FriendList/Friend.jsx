import React from "react";
import { Link, NavLink } from "react-router-dom";
import usersData from "../../data/UserProfileData.json";
import "../../style/FriendStyle.css";
import defaultAvatar from "../../assets/프로필.png";

const UserProfile = ({ image, nickname, introduction, sex, age }) => {
  return (
    <div className="user-profile">
      <div className="avatar-container">
        {image ? (
          <img src={image} alt={`Profile of ${nickname}`} className="avatar" />
        ) : (
          <img src={defaultAvatar} alt="profile" className="avatar" />
        )}
      </div>
      <div className="nickname">
        {nickname}
        <p>
          ({sex}/{age})
        </p>
      </div>
      <div className="introduction">"{introduction}"</div>
    </div>
  );
};
const Friend = () => {
  const activeStyle = {
    color: "white",
    backgroundColor: "black",
  };

  return (
    <div className="app">
      <main>
        <div className="button-container">
          <NavLink
            className="nav-button"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/following"
          >
            팔로잉
          </NavLink>
          <NavLink
            className="nav-button"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/follower"
          >
            팔로워
          </NavLink>
          <NavLink
            className="nav-button"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/friend"
          >
            친구목록
          </NavLink>
        </div>
        <div className="user-list">
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
                sex={user.sex}
                age={user.age}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Friend;
