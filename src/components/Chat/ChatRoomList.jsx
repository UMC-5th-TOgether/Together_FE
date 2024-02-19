import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import "../../style/ChatStyle.css";
import ChatRoomListSample from "./ChatRoomListSample";

const ChatRoomList = ({ chatRoomId, onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState();
  const stompClient = useRef(null);
  const currentSubscription = useRef(null);
  // const chatRoomId = Number(1);

  useEffect(() => {
    stompClient.current = new Client({
      brokerURL: "wss://hyunjin.link/ws/chat",
      onConnect: () => {
        console.log("Connected to STOMP server");
        // 사용자의 채팅방 목록을 조회하기 위한 구독 설정
        stompClient.current.subscribe(`/rooms/me`, (message) => {
          const userRooms = JSON.parse(message.body);
          setRooms(userRooms);
        });

        stompClient.current.publish({
          destination: `/chat/rooms/${chatRoomId}`,
          body: "{}",
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

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, []); // 의존성 배열에서 stompClient.current 제거
  // onClick 핸들러를 수정합니다.
  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId);
    if (typeof onSelectRoom === "function") {
      onSelectRoom(roomId);
    }
    // 선택한 채팅방에 대한 구독 설정 또는 업데이트 로직을 여기에 추가할 수 있습니다.
    // 예를 들어, 선택된 채팅방의 실시간 메시지를 받기 위한 구독 등
  };

  return (
    <div className="chat-room-list">
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
