import { useState, useEffect } from "react";
import StompClient from "./StompClient";
export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const stompClient = new StompClient();

  useEffect(() => {
    let subscription = null;

    const connectCallback = () => {
      // 구독 로직
      if (roomId) {
        subscription = stompClient.subscribe(
          `/topic/chat/${roomId}`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        );
      }
    };

    // STOMP 연결 활성화
    stompClient.activate(connectCallback);

    return () => {
      // 구독 해제
      if (subscription) {
        stompClient.unsubscribe(subscription.id);
      }
      stompClient.deactivate();
    };
  }, [roomId, stompClient]);

  const sendMessage = (messagePayload) => {
    stompClient.sendMessage(
      `/app/chat/${roomId}/sendMessage`,
      JSON.stringify(messagePayload)
    );
    // 보내는 메시지를 로컬 상태에 추가하지 않음. 구독을 통해 서버로부터 메시지가 도착하면 그 때 추가
  };

  return { messages, sendMessage };
};
