import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import useWebSocket from "../../util/useWebSocket";
import profileImage from "../../assets/프로필_blue.png";
import { fetchMessages, saveMessage } from "../../util/ChatApi";

const ChatRoom = ({ chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { isConnected, client } = useWebSocket("wss://hyunjin.link/ws/chat");

  const senderId = Number(1);
  const receiverId = Number(2);

  useEffect(() => {
    if (chatRoomId) {
      fetchMessages(chatRoomId)
        .then((fetchedMessages) => {
          setMessages(fetchedMessages);
        })
        .catch((error) => console.error("Fetching messages failed:", error));
    }

    if (isConnected && receiverId) {
      const subscription = client.subscribe(
        `/chatRoom/enter/${receiverId}`,
        (message) => {
          const newMsg = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMsg]);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, [client, isConnected, receiverId, chatRoomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !receiverId || !isConnected) return;

    const messagePayload = {
      message: newMessage,
      senderId: Number(senderId),
      receiverId: Number(receiverId),
      chatRoomId,
    };

    // WebSocket을 통해 실시간으로 메시지 발행
    if (client && isConnected) {
      client.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify(messagePayload),
      });
    }

    // 화면에 메시지 렌더링
    setMessages((prevMessages) => [...prevMessages, messagePayload]);
    setNewMessage(""); // 메시지 입력 필드 초기화
  };

  return (
    <div className="chat-room">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-content">{msg.message}</div>
            <div className="message-meta">
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
              <img
                src={profileImage}
                alt="Profile"
                className="message-profile"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-area">
        <input
          type="text"
          className="message-input"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
