import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import "../../style/ChatStyle.css"; // 해당 CSS 파일의 경로를 확인해 주세요.
import ChatRoomListSample from "./ChatRoomListSample";

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "wss://hyunjin.link/ws/chat",
      onConnect: () => {
        console.log("Connected to STOMP server");
        stompClient.subscribe("/chatRoom/list", (message) => {
          const roomList = JSON.parse(message.body);
          setRooms(roomList);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from STOMP server");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId);
    if (typeof onSelectRoom === "function") {
      onSelectRoom(roomId);
    }
  };

  return (
    <div className="chat-room-list">
      <ChatRoomListSample
        onSelectRoom={handleRoomSelect}
        selectedRoomId={selectedRoomId}
      />
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`chat-room-entry ${
            selectedRoomId === room.id ? "selected" : ""
          }`}
          onClick={() => handleRoomSelect(room.id)}
        >
          <img className="chat-room-avatar" src={room.avatar} alt="Avatar" />
          <div className="chat-room-info">
            <div className="chat-room-title">{room.title}</div>
            <div className="chat-room-last-message">{room.lastMessage}</div>
            <div className="chat-room-meta">
              <span className="chat-room-username">{room.username}</span>
              <span className="chat-room-timestamp">{room.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
