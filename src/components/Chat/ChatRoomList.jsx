import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import "../../style/ChatStyle.css";
import ChatRoomListSample from "./ChatRoomListSample";

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const stompClient = useRef(null);
  const currentSubscription = useRef(null);

  useEffect(() => {
    stompClient.current = new Client({
      brokerURL: "wss://hyunjin.link/ws/chat",
      onConnect: () => {
        console.log("Connected to STOMP server");
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
  }, []);

  useEffect(() => {
    // 새로운 roomId에 대한 구독 설정
    if (selectedRoomId) {
      // 이전 구독이 있다면 해지
      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe();
      }

      // 새로운 roomId에 대한 구독 설정
      currentSubscription.current = stompClient.current.subscribe(
        `/chatRoom/list/${selectedRoomId}`,
        (message) => {
          const roomList = JSON.parse(message.body);
          setRooms(roomList);
        }
      );

      // 기존 코드
      stompClient.current.publish({
        destination: "/sub/chat/room",
        body: JSON.stringify({ chatRoomId: 0 }),
      });

      // 수정한 코드
      // axios
      //   .post("/sub/chat/room", { chatRoomId: "null" })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }

    return () => {
      // 컴포넌트 언마운트 시 현재 구독 해지
      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe();
      }
    };
  }, [selectedRoomId]);

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
