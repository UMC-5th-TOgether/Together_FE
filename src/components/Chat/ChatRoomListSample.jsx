import React from "react";
import chatData from "./Chat.json"; // chatData의 경로를 확인해주세요.
import sampleavatar from "../../assets/프로필_blue.png"; // 샘플 아바타 이미지 경로
import nomatch from "../../assets/매칭전.png"; // '매칭전' 이미지 경로

const ChatRoomListSample = ({ selectedRoomId, onSelectRoom }) => {
  return chatData.chatRooms.map((room) => (
    <div
      key={room.id}
      className={`chat-room-entry ${
        selectedRoomId === room.id ? "selected" : ""
      }`}
      onClick={() => onSelectRoom(room.id)}
    >
      <div className="room-image">
        <img className="matching-status" src={nomatch} alt="Match" />
        <img className="chat-room-avatar" src={sampleavatar} alt="Avatar" />
      </div>
      <div className="chat-room-info">
        <div className="chat-room-title">{room.name}</div>
        <div className="chat-room-last-message">
          "이곳은 샘플 채팅방입니다."
        </div>
        <div className="chat-room-meta">
          <span className="chat-room-username">AlmondBrize (여성 / 23)</span>
          <span className="chat-room-timestamp">38분 전</span>
        </div>
      </div>
    </div>
  ));
};

export default ChatRoomListSample;
