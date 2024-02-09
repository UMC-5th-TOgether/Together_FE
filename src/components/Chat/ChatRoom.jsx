import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios 라이브러리를 import합니다.
import StompClient from "../../util/StompClient"; // StompClient 경로를 확인하고 import합니다.
import profileImage from "../../assets/프로필_blue.png"; // 프로필 이미지 경로를 확인하고 import합니다.

// StompClient 인스턴스를 생성합니다.
// 이 인스턴스는 WebSocket 연결과 메시지 구독 및 발행을 관리합니다.
const stompClient = new StompClient("ws://localhost:8080/ws");

// ChatRoom 컴포넌트 정의
const ChatRoom = ({ selectedRoomId }) => {
  const [messages, setMessages] = useState([]); // 메시지 목록 상태를 관리합니다.
  const [newMessage, setNewMessage] = useState(""); // 새 메시지 입력 상태를 관리합니다.

  // 컴포넌트가 마운트되거나 selectedRoomId가 변경될 때 실행됩니다.
  useEffect(() => {
    // STOMP 연결을 활성화합니다.
    stompClient.activate();

    // 선택된 채팅방에 대한 메시지를 구독합니다.
    const subscription = stompClient.subscribe(
      `/topic/chat/${selectedRoomId}`,
      (message) => {
        const newMessage = JSON.parse(message.body); // 수신된 메시지를 파싱합니다.
        setMessages((prevMessages) => [...prevMessages, newMessage]); // 메시지 목록을 업데이트합니다.
      }
    );

    // 컴포넌트가 언마운트될 때 실행됩니다.
    return () => {
      if (subscription) {
        subscription.unsubscribe(); // 메시지 구독을 취소합니다.
      }
      stompClient.deactivate(); // STOMP 연결을 비활성화합니다.
    };
  }, [selectedRoomId]);

  // 메시지 전송을 처리하는 함수입니다.
  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedRoomId) {
      const messagePayload = {
        content: newMessage,
        timestamp: new Date().toISOString(),
        roomId: selectedRoomId,
      };

      try {
        // STOMP를 사용하여 메시지를 전송합니다.
        stompClient.sendMessage(
          `/app/chat/${selectedRoomId}/sendMessage`,
          messagePayload
        );

        // Axios를 사용하여 서버에 메시지를 전송합니다.
        // 이 부분은 실제 서버의 API 엔드포인트에 맞게 수정해야 합니다.
        await axios.post(
          `/api/chat/${selectedRoomId}/sendMessage`,
          messagePayload
        );

        // 메시지 목록을 업데이트합니다.
        setMessages((prevMessages) => [...prevMessages, messagePayload]);
      } catch (error) {
        // 메시지 전송에 실패한 경우 오류를 로그합니다.
        console.error("Message sending failed:", error);
      }

      // 입력 필드를 초기화합니다.
      setNewMessage("");
    }
  };

  // ChatRoom 컴포넌트의 JSX를 반환합니다.
  // 이 부분은 메시지를 렌더링하고 새 메시지를 입력할 수 있는 UI를 구성합니다.
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
