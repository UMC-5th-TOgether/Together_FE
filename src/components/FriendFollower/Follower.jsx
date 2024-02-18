import React from "react";
import { Link, NavLink } from "react-router-dom";
import usersData from "../../data/UserProfileData.json";
import "../../style/FollowerStyle.css";
import defaultAvatar from "../../assets/프로필.png";

export default function Follower() {
  const UserProfile = ({ image, nickname, title, gender, age }) => {
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
        <div className="title">{title}</div>
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
              <Link
                to={`/matching/${user.id}`}
                className="user-profile-link"
                key={user.id}
              >
                <UserProfile
                  image={user.image}
                  nickname={user.nickname}
                  title={user.title}
                  gender={user.gender}
                  age={user.age}
                />
              </Link>
              <div className="follower-btn">
                <button>거절</button>
                <button>수락</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
