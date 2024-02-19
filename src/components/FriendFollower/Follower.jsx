import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { dummy } from "../../data/FollowerDummy";
import "../../style/FollowerStyle.css";
import defaultAvatar from "../../assets/프로필.png";
import axios from "axios";

export default function Follower() {
  const token = localStorage.getItem("token");
  const [FollowerData, setFollowerData] = useState(null);
  // const followers = dummy.followerList;
  useEffect(() => {
    const fetchFollowerData = async () => {
      try {
        const res = await axios.get(
          "https://hyeonjo.shop/api/friends/follower",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        if (res.data.isSuccess) {
          console.log(res.data.data);
          const data = res.data.data;
          setFollowerData(data.followerList);
        }
      } catch (error) {
        console.error("Error fetching following data:", error);
      }
    };

    fetchFollowerData();
  }, []);

  const handleDecline = async (matchingId) => {
    console.log(matchingId)
    try {
      const res = await axios.patch(
        `https://hyeonjo.shop/api/matching/decline`,
        {
          matchingId: matchingId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Decline response:", res.data);
    } catch (error) {
      console.error("Error declining user:", error);
    }
  };

  const handleAccept = async (matchingId) => {
    try {
      const res = await axios.patch(
        `https://hyeonjo.shop/api/matching/accept`,
        {
          matchingId: matchingId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Accept response:", res.data);
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };


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
            ({gender === "FEMALE" ? "여성" : "남성"}/{age})
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
          {FollowerData && FollowerData.map((followerData, index) => (
            <div className="user-profile" key={index}>
              <Link
                to={`/matching/detail/${followerData.matchingId}`}
                className="user-profile-link"
                state={{ matchingInfo: followerData }}
              >
                <UserProfile
                  image={followerData.image}
                  nickname={followerData.nickname}
                  title={followerData.title}
                  gender={followerData.gender}
                  age={followerData.age}
                />
              </Link>
              <div className="follower-btn">
                <button onClick={() => handleDecline(followerData.matchingId)}>거절</button>
                <button onClick={() => handleAccept(followerData.matchingId)}>수락</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
