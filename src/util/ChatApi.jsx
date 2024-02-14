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

export function saveMessage(messagePayload) {
  stompClient.publish({
    destination: "/chat/message",
    body: JSON.stringify(messagePayload),
  });
}
