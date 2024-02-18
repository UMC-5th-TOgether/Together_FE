import React, { useEffect, useState } from "react"; // 'useState'와 'useEffect'는 현재 사용되지 않으므로 제거합니다.
import { Link } from "react-router-dom"; // 'Link'를 'react-router-dom'에서 올바르게 가져옵니다.
import ChatRoom from "../components/Chat/ChatRoom";
import ChatRoomList from "../components/Chat/ChatRoomList";
import "../style/ChatStyle.css";
import BannerImage from "../assets/Chat.png";
import chattinglist from "../assets/채팅 리스트 이동 버튼_Default.png"; // 이미지는 올바르게 가져옵니다.
import postcheck from "../assets/포스팅 확인 이동 버튼_Default.png"; // 이미지는 올바르게 가져옵니다.
import { useDispatch } from "react-redux";
import { setAuthToken, setIsLoggedIn } from "../store/LoginActions"; // 액션 크리에이터 경로는 실제 프로젝트 구조에 맞게 조정해야 함

const ChattingPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // 토큰 설정 (이 부분에서 실제 로그인 로직을 구현하거나, 사전에 알고 있는 토큰을 사용)
    const hardcodedToken = "SET_IS_LOGGED_IN";

    // Redux 스토어에 토큰 저장
    dispatch(setAuthToken(hardcodedToken));
    dispatch(setIsLoggedIn(true));

    // 페이지 로드 시 한 번만 실행되도록 빈 의존성 배열 사용
  }, [dispatch]);

  return (
    <>
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </head>
      <div className="chat-page">
        <header style={{ marginBottom: "72px" }}>
          <img
            src={BannerImage}
            alt="Banner"
            style={{ width: "100%", height: "400px" }}
          />
        </header>
        <div
          className={`chat-container ${isExpanded ? "expand" : "notexpand"}`}
        >
          <ChatRoomList />
          {!isExpanded && <ChatRoom />}
        </div>

        <div className="posting-button-wrap">
          <img
            className="chatting-list"
            src={chattinglist}
            alt="Expand ChatRoomList"
            onClick={handleToggleExpand}
          />
          <Link to="/posting">
            <img className="post-check" src={postcheck} alt="Post Check" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChattingPage;
