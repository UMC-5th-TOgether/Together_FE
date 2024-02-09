import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import "../../style/ChatStyle.css"; // 해당 CSS 파일의 경로를 확인해 주세요.
import ChatRoomListSample from "./ChatRoomListSample";
import chatData from "./Chat.json"; // chatData의 경로를 확인해주세요.

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const sampleRoom = chatData.chatRooms[0]; // 첫 번째 채팅방을 샘플로 사용합니다.

  useEffect(() => {
    const stompClient = new Client({
      // STOMP 서버의 웹소켓 엔드포인트를 설정해 주세요.
      brokerURL: "wss://your-websocket-server-url",
      onConnect: () => {
        // 채팅방 목록에 대한 구독을 설정합니다.
        stompClient.subscribe("/topic/chatRoom/list", (message) => {
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

  // // 채팅방을 선택하는 함수
  // const handleRoomSelect = (roomId) => {
  //   if (typeof onSelectRoom === "function") {
  //     onSelectRoom(roomId); // onSelectRoom이 함수인지 확인한 후 호출합니다.
  //   } else {
  //     console.error("onSelectRoom is not a function");
  //   }
  // };

  useEffect(() => {
    fetch("Chat.json") // 'public' 폴더 내에 있으므로 상대 경로 사용
      .then((response) => response.json())
      .then((data) => setRooms(data.rooms))
      .catch((error) => console.error("Error loading chat rooms:", error));
  }, []);

  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId); // 선택된 채팅방 ID 업데이트
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
