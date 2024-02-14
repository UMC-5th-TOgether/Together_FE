import React, { useState, useEffect } from "react";
import axios from "axios";
import useWebSocket from "../../util/useWebSocket"; // 경로는 실제 파일 위치에 맞게 조정하세요.
import profileImage from "../../assets/프로필_blue.png"; // 프로필 이미지 경로 확인

const ChatRoom = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // useWebSocket 훅을 사용하여 WebSocket 연결 상태 및 클라이언트 객체를 관리합니다.
  const { isConnected, client } = useWebSocket("ws://hyunjin.link/ws/chat");

  useEffect(() => {
    // WebSocket 연결이 활성화되었고, receiverId가 유효한 경우에만 구독을 설정합니다.
    if (isConnected && receiverId) {
      const subscription = client.subscribe(
        `/chatRoom/enter/${receiverId}`,
        (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      );

      // 구독 해지 로직을 반환하여, 컴포넌트가 언마운트될 때 구독을 자동으로 해지합니다.
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [client, isConnected, receiverId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !receiverId || !isConnected) return;

    const messagePayload = {
      content: newMessage,
      timestamp: new Date().toISOString(),
      roomId: receiverId,
    };

    try {
      // 메시지 발행
      client.publish({
        destination: `/pub/chat/message`,
        body: JSON.stringify(messagePayload),
      });

      // 서버에 메시지 저장을 위한 API 요청 (옵션)
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
