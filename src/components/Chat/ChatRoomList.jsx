import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import chatData from "./Chat.json"; // The local JSON file with chat rooms

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState(chatData.chatRooms); // Use the local JSON data

  // Setup STOMP client and connect to the server
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "wss://your-websocket-server-url",
      // ...
    });

    stompClient.activate();

    return () => stompClient.deactivate();
  }, []);

  // Handle room selection
  const handleRoomSelect = (room) => {
    // Implement room selection logic
    onSelectRoom(room);
  };

  return (
    <div className="chat-room-list">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="chat-room-entry"
          onClick={() => handleRoomSelect(room)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
