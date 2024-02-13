import React, { useState, useEffect } from "react";
import axios from "axios";
import StompClient from "../../util/StompClient"; // 경로는 프로젝트에 맞게 조정하세요.
import profileImage from "../../assets/프로필_blue.png"; // 프로필 이미지 경로 확인

const ChatRoom = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const client = new StompClient("https://hyunjin.link/ws/chat");
    setStompClient(client);

    return () => client.deactivate();
  }, []);

  useEffect(() => {
    if (!stompClient || !receiverId) return;

    if (!stompClient.isConnected) {
      stompClient.activate();
    }

    return () => {
      if (stompClient.isConnected) {
        stompClient.deactivate();
      }
    };
  }, [stompClient, receiverId]);

  useEffect(() => {
    if (!stompClient || !stompClient.isConnected || !receiverId) return;

    const subscriptionId = stompClient.subscribe(
      `/chatRoom/enter/${receiverId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    );

    return () => stompClient.unsubscribe(subscriptionId);
  }, [stompClient, receiverId]);

  const handleSendMessage = async () => {
    if (
      !newMessage.trim() ||
      !receiverId ||
      !stompClient ||
      !stompClient.isConnected
    )
      return;

    const messagePayload = {
      content: newMessage,
      timestamp: new Date().toISOString(),
      roomId: receiverId,
    };

    try {
      stompClient.sendMessage(`/pub/chat/message`, messagePayload);
      await axios.post(`/pub/chat/message`, messagePayload);
      setMessages((prevMessages) => [...prevMessages, messagePayload]);
    } catch (error) {
      console.error("Message sending failed:", error);
    }

    setNewMessage("");
  };

  return (
    <div className="chat-room">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-content">{msg.content}</div>
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
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
