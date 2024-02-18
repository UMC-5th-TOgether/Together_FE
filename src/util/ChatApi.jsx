import { Client } from "@stomp/stompjs";

let stompClient = new Client({
  brokerURL: "wss://hyunjin.link/ws/chat",
});

stompClient.activate();

export function fetchMessages(chatRoomId) {
  stompClient.subscribe(`/chat/messages/${chatRoomId}`, (message) => {
    // 메시지 처리
    console.log(JSON.parse(message.body));
  });
}

// Function to save a message to the database
export const saveMessage = async (messagePayload) => {
  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagePayload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json(); // or `response.statusText` if the API doesn't return a body
  } catch (error) {
    throw error;
  }
};
