import React, { useState, useEffect } from "react";
// import axios from "axios";
import useWebSocket from "../../util/useWebSocket"; // 실제 경로에 맞게 조정하세요.
import profileImage from "../../assets/프로필_blue.png"; // 실제 경로에 맞게 조정하세요.
import { fetchMessages, saveMessage } from "../../util/ChatApi"; // 실제 경로에 맞게 조정하세요.

const ChatRoom = ({ receiverId, senderId, chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { isConnected, client } = useWebSocket("wss://hyunjin.link/ws/chat");

  useEffect(() => {
    if (chatRoomId) {
      fetchMessages(chatRoomId)
        .then((fetchedMessages) => {
          console.log("Fetched messages:", fetchedMessages); // 콘솔 로그 추가
          setMessages(fetchedMessages);
        })
        .catch((error) => console.error("Fetching messages failed:", error));
    }

    if (isConnected && receiverId) {
      const subscription = client.subscribe(
        `/chatRoom/enter/${receiverId}`,
        (message) => {
          const newMsg = JSON.parse(message.body);
          console.log("New message received:", newMsg); // 콘솔 로그 추가
          setMessages((prevMessages) => [...prevMessages, newMsg]);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, [client, isConnected, receiverId, chatRoomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !receiverId || !isConnected) return;

    const messagePayload = {
      message: newMessage,
      senderId,
      receiverId,
      chatRoomId,
    };

    console.log("Sending message:", messagePayload); // 콘솔 로그 추가

    try {
      // 메시지 발행
      client.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify(messagePayload),
      });

      // 서버에 메시지 저장
      await saveMessage(chatRoomId, messagePayload);
      console.log("Message sent and saved:", messagePayload); // 콘솔 로그 추가

      // 화면에 메시지 렌더링
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messagePayload, timestamp: new Date().toISOString() },
      ]);

      setNewMessage(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Message sending failed:", error);
    }
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
