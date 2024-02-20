import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { dummy } from "../../data/FriendListDummy";
import "../../style/FriendStyle.css";
import defaultAvatar from "../../assets/프로필.png";

const UserProfile = ({ image, nickname, profileMessage, gender, age }) => {
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
          ({gender === "FEMALE" ? "여성" : "남성"}/{age})
        </p>
      </div>
      <div className={profileMessage === null ? 'friend-profileMessage no-message' : 'friend-profileMessage'}>
        {profileMessage === null ? '프로필 메세지가 없습니다' : profileMessage}
      </div>
    </div>
  );
};

const Friend = () => {
  const token = localStorage.getItem("token");

  const [friendList, setFriendList] = useState(null);
  const friends = dummy.friendList;

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const res = await axios.get("https://hyeonjo.shop/api/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);

        if (res.data.isSuccess) {
          console.log(res.data.data);
          const data = res.data.data;
          setFriendList(data.friendList);
        }
      } catch (error) {
        console.error("Error fetching friendList info:", error);
      }
    };

    fetchFriendList();
  }, []);

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
          {friendList && friendList.map((friendList, index) => (
            <div className="user-profile" key={index}>
              <Link
                to={`/FriendProfile/${friendList.friendId}`}
                className="user-profile-link"
                state={{ friendId: friendList.friendId }}
                key={friendList.friendId}
              >
                <UserProfile
                  image={friendList.image}
                  nickname={friendList.nickname}
                  title={friendList.title}
                  gender={friendList.gender}
                  age={friendList.age}
                  profileMessage={friendList.profileMessage}
                />
              </Link>

            </div>
          ))}

        </div>
      </main>
    </div>
  );
};

export default Friend;
