import { Client } from "@stomp/stompjs";

let stompClient = new Client({
  brokerURL: "wss://hyunjin.link/ws/chat",
});

stompClient.activate();

// 채팅방에 메시지를 받기 위해 구독하는 함수
export function subscribeToMessages(chatRoomId, messageReceivedCallback) {
  // 특정 채팅방 토픽에 구독하여 메시지를 받음
  stompClient.subscribe(`/topic/${chatRoomId}/message`, (message) => {
    // 콜백 함수를 호출하여 수신된 메시지를 처리
    messageReceivedCallback(JSON.parse(message.body));
  });
}

// 메시지 상태와 메시지 내용을 서버로 보내는 함수
export const sendMessage = async (chatRoomId, message, status, token) => {
  const messagePayload = {
    message,
    status,
    // token, // 메시지 페이로드에 토큰 포함
    chatRoomId, // chatRoomId도 페이로드에 포함
  };

  try {
    const response = await fetch(`/app/message`, {
      // URL 주소 확인 필요
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 토큰을 여기에 포함할지, 또는 페이로드 내에 포함할지 결정 필요
        // Authorization: `Bearer ${token}`, // HTTP 헤더에 토큰 포함하는 경우
      },
      body: JSON.stringify(messagePayload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to send the message:", error);
  }
};

export function fetchMessages(chatRoomId) {
  stompClient.subscribe(`/app/chat/{chatRoomId}`, (message) => {
    // 메시지 처리
    console.log(JSON.parse(message.body));
  });
}

// Function to save a message to the database
// 데이터베이스에 메시지를 저장하는 함수
export const saveMessage = async (messagePayload) => {
  try {
    const response = await fetch("/app/message", {
      method: "POST", // 데이터를 보내기 때문에 메소드를 POST로 변경
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagePayload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
