import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../style/FollowingStyle.css";
import defaultAvatar from "../../assets/프로필.png";
import axios from "axios";

export default function Following() {
  const token = localStorage.getItem("token");
  const [followingData, setFollowingData] = useState([]);

  useEffect(() => {
    const fetchFollowingData = async () => {
      try {
        const res = await axios.get(
          "https://hyeonjo.shop/api/friends/following",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.isSuccess) {
          setFollowingData(res.data.data.followingList);
        }
      } catch (error) {
        console.error("Error fetching following data:", error);
      }
    };

    fetchFollowingData();
  }, []);

  const UserProfile = ({ profileImg, nickname, title, gender, age }) => {
    return (
      <div className="follower-profile">
        <div className="avatar-container">
          <img
            src={profileImg ? profileImg : defaultAvatar}
            alt={`Profile of ${nickname}`}
            className="avatar"
          />
        </div>
        <div className="nickname">
          {nickname}
          <p>
            ({gender === "FEMALE" ? "여성" : "남성"}/{age})
          </p>
        </div>
        <div className="following-introduction">{title}</div>
        <div className="following-notice">요청 보냄</div>
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
          {followingData.map((user) => (
            <div className="user-profile" key={user.matchingId}>
              <UserProfile
                profileImg={user.profileImg}
                nickname={user.nickname}
                title={user.title}
                gender={user.gender}
                age={user.age}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
