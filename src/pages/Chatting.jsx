// pages/chatting.jsx

import React, { useState, useEffect, Link } from "react";
import ChatRoom from "../components/Chat/ChatRoom";
import ChatRoomList from "../components/Chat/ChatRoomList";
import "../style/ChatStyle.css";
import BannerImage from "../assets/Chat.png";
import { postcheck } from "../assets/채팅 리스트 이동 버튼_Default.png";

const ChattingPage = () => {
  return (
    <div class="chat-page">
      <header style={{ marginBottom: "72px" }}>
        <img
          src={BannerImage}
          alt="Banner"
          style={{ width: "100%", height: "400px" }}
        />
      </header>
      <div class="chat-container">
        <ChatRoomList />
        <ChatRoom />
      </div>

      {/* <div className="posting-button-wrap">
        <Link to="/posting">
          <img className="post-check" src={postcheck}></img>
        </Link>
        <Link to="/posting">
          <img className="post-check" src={postcheck}></img>
        </Link>
      </div> */}
    </div>
  );
};

export default ChattingPage;
