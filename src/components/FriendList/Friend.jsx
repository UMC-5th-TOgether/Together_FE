import React from "react";
import { Link } from "react-router-dom";
import usersData from "../../data/UserProfileData.json"; // Adjust the path as needed
import "../../style/FriendStyle.css"; // 이 경로에 해당하는 CSS 파일에 스타일을 정의해야 합니다.

// UserProfile 컴포넌트는 사용자의 프로필 이미지, 닉네임, 그리고 소개를 표시합니다.
const UserProfile = ({ image, nickname, introduction }) => {
  return (
    <div className="user-profile">
      <div className="avatar-container">
        {/* 이미지 URL이 있는 경우에만 img 태그를 렌더링합니다. */}
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
