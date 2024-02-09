// pages/chatting.jsx

import React from "react"; // 'useState'와 'useEffect'는 현재 사용되지 않으므로 제거합니다.
import { Link } from "react-router-dom"; // 'Link'를 'react-router-dom'에서 올바르게 가져옵니다.
import ChatRoom from "../components/Chat/ChatRoom";
import ChatRoomList from "../components/Chat/ChatRoomList";
import "../style/ChatStyle.css";
import BannerImage from "../assets/Chat.png";
import chattinglist from "../assets/채팅 리스트 이동 버튼_Default.png"; // 이미지는 올바르게 가져옵니다.
import postcheck from "../assets/포스팅 확인 이동 버튼_Default.png"; // 이미지는 올바르게 가져옵니다.

const ChattingPage = () => {
  return (
    <div className="chat-page">
      <header style={{ marginBottom: "72px" }}>
        <img
          src={BannerImage}
          alt="Banner"
          style={{ width: "100%", height: "400px" }}
        />
      </header>
      <div className="chat-container">
        <ChatRoomList />
        <ChatRoom />
      </div>

      <div className="posting-button-wrap">
        <Link to="/posting">
          <img className="chatting-list" src={chattinglist} alt="Post Check" />
        </Link>
        <Link to="/posting">
          <img className="post-check" src={postcheck} alt="Post Check" />
        </Link>
      </div>
    </div>
  );
};

export default ChattingPage;
