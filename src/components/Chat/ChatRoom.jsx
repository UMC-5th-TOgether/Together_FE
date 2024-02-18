import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import useWebSocket from "../../util/useWebSocket"; // WebSocket 연결을 관리하는 커스텀 훅
import profileImage from "../../assets/프로필_blue.png"; // 프로필 이미지 경로
import { fetchMessages, saveMessage } from "../../util/ChatApi"; // 채팅 메시지 관련 API 호출

const ChatRoom = ({ chatRoomId }) => {
  const [messages, setMessages] = useState([]); // 채팅 메시지 상태
  const [newMessage, setNewMessage] = useState(""); // 입력한 새로운 메시지 상태
  const { isConnected, client } = useWebSocket("wss://hyunjin.link/ws/chat"); // WebSocket 연결 상태 및 클라이언트

  const senderId = Number(1); // 메시지를 보내는 사람 ID
  const receiverId = Number(2); // 메시지를 받는 사람 ID

  useEffect(() => {
    if (chatRoomId) {
      fetchMessages(chatRoomId)
        .then((fetchedMessages) => {
          setMessages(fetchedMessages); // 새로운 chatRoomId에 대한 메시지로 상태 업데이트
        })
        .catch((error) => console.error("Fetching messages failed:", error));
    } else {
      setMessages([]); // chatRoomId가 null인 경우 메시지 배열 초기화
    }

    // WebSocket 연결이 활성화되고 receiverId가 설정된 경우 해당 채널을 구독하여 메시지 수신
    if (isConnected && receiverId) {
      const subscription = client.subscribe(
        `/chatRoom/enter/${receiverId}`, // 수신할 채널
        (message) => {
          const newMsg = JSON.parse(message.body); // 수신한 메시지 파싱
          setMessages((prevMessages) => [...prevMessages, newMsg]); // 새로운 메시지 추가
        }
      );

      // 컴포넌트가 언마운트되면 구독 취소
      return () => subscription.unsubscribe();
    }
  }, [client, isConnected, receiverId, chatRoomId]); // chatRoomId가 변경될 때마다 효과 실행

  // 새로운 메시지를 전송하는 함수
  const handleSendMessage = (e) => {
    e.preventDefault(); // 기본 동작 방지

    // 입력한 메시지가 비어있거나 receiverId가 설정되지 않았거나 WebSocket이 연결되지 않은 경우 종료
    if (!newMessage.trim() || !receiverId || !isConnected) return;

    // 메시지 페이로드 생성
    const messagePayload = {
      message: newMessage,
      senderId: Number(senderId),
      receiverId: Number(receiverId),
      chatRoomId,
    };

    // WebSocket을 통해 메시지 발행
    if (client && isConnected) {
      client.publish({
        destination: "/pub/chat/message", // 발행할 채널
        body: JSON.stringify(messagePayload), // 메시지 내용
      });
    }

    // 화면에 메시지 렌더링
    setMessages((prevMessages) => [...prevMessages, messagePayload]);
    setNewMessage(""); // 입력 필드 초기화
  };

  return (
    <div className="chat-room">
      {/* 채팅 메시지를 렌더링하는 부분 */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === senderId ? "sent" : "received"
            }`}
          >
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
      {/* 메시지 입력 영역 */}
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
