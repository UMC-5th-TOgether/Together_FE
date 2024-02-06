import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    const stompClient = new Client({
      // STOMP 서버의 웹소켓 엔드포인트
      brokerURL: "wss://your-websocket-server-url",
      onConnect: () => {
        // 채팅방 목록을 위한 구독 설정
        stompClient.subscribe("/topic/rooms", (message) => {
          setRooms(JSON.parse(message.body));
        });
      },
      // 에러 핸들링 등 필요한 설정 추가
    });

    stompClient.activate();

    // 컴포넌트 언마운트 시 클라이언트 비활성화
    return () => {
      stompClient.deactivate();
    };
  }, []);

  // 채팅방 선택 함수
  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
    onSelectRoom(roomId); // 부모 컴포넌트에 선택된 방 ID 전달
  };

  return (
    <div className="chat-room">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`chat-room-entry ${
            selectedRoomId === room.id ? "selected" : ""
          }`}
          onClick={() => handleSelectRoom(room.id)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
