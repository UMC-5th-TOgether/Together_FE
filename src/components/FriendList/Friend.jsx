import React from "react";
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
// App 컴포넌트는 여러 UserProfile 컴포넌트를 렌더링하는 데 사용됩니다.
const Friend = () => {
  // 이 데이터는 API 호출을 통해 동적으로 로드되어야 합니다.
  // 여기에서는 하드코딩된 예시 데이터를 사용하고 있습니다.
  const usersData = [
    {
      id: 1,
      image: "", // 실제 이미지 URL로 교체해야 합니다.
      nickname: "User 1",
      introduction: "안녕 난 유저 1이야",
    },
    {
      id: 2,
      image: "",
      nickname: "User 2",
      introduction: "안녕 난 유저 2여",
    },
    // ... 추가 사용자 데이터
  ];

  return (
    <div className="app">
      <main>
        <section className="user-list">
          {usersData.map((user) => (
            <UserProfile
              key={user.id}
              image={user.image}
              nickname={user.nickname}
              introduction={user.introduction}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Friend;
