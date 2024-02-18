import React from "react";
import { Link, NavLink } from "react-router-dom";
import usersData from "../../data/UserProfileData.json";
import "../../style/FollowingStyle.css";
import defaultAvatar from "../../assets/프로필.png";

export default function Following() {
  const UserProfile = ({ image, nickname, following, gender, age }) => {
    return (
      <div className="follower-profile">
        <div className="avatar-container">
          {image ? (
            <img
              src={image}
              alt={`Profile of ${nickname}`}
              className="avatar"
            />
          ) : (
            <img src={defaultAvatar} alt="profile" className="avatar" />
          )}
        </div>
        <div className="nickname">
          {nickname}
          <p>
            ({gender}/{age})
          </p>
        </div>
        <div className="following-introduction">{following}</div>
      </div>
    );
  };
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
            <div className="user-profile">
              <UserProfile
                image={user.image}
                nickname={user.nickname}
                following={user.following}
                gender={user.gender}
                age={user.age}
              />
              <div className="following-notice">요청 보냄</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
