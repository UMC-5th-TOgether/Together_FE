import axios from "axios";

// 서버의 REST API 엔드포인트로 변경하세요.
const API_BASE_URL = "https://hyunjin.link/api";

export async function fetchMessages(chatRoomId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/chat/messages/${chatRoomId}`
    );
    return response.data; // 가정: 서버에서 메시지 배열을 반환
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

export async function saveMessage(messagePayload) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/chat/message`,
      messagePayload
    );
    return response.data; // 서버 응답 처리
  } catch (error) {
    console.error("Failed to save message:", error);
  }
}
