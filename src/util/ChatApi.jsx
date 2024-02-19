import { Client } from "@stomp/stompjs";

let stompClient = new Client({
  brokerURL: "wss://hyunjin.link/ws/chat",
});

stompClient.activate();

// 채팅방에 메시지를 받기 위해 구독하는 함수
export function subscribeToMessages(chatRoomId, messageReceivedCallback) {
  // 특정 채팅방 토픽에 구독하여 메시지를 받음
  stompClient.subscribe(`/topic/message/${chatRoomId}`, (message) => {
    // 콜백 함수를 호출하여 수신된 메시지를 처리
    messageReceivedCallback(JSON.parse(message.body));
  });
}

// 메시지 상태와 메시지 내용을 서버로 보내는 함수
export const sendMessage = (chatRoomId, message, status) => {
  // 여기에서 status는 "JOIN", "MESSAGE", "LEAVE" 중 하나입니다.
  const messagePayload = {
    message: message,
    status: status, // Status enum 값을 문자열로 전송
  };

  // fetch API를 사용하여 서버로 POST 요청을 보냅니다.
  fetch(`/app/message/${chatRoomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messagePayload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export function fetchMessages(chatRoomId) {
  stompClient.subscribe(`/app/message/{chatRoomId}`, (message) => {
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
