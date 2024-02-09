import axios from "axios";

const API_BASE_URL = "http://your-api-url.com";

// 기존 메시지 불러오기
async function fetchMessages(roomId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

// 새 메시지 저장하기
async function saveMessage(roomId, message) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/messages/${roomId}`,
      message
    );
    return response.data;
  } catch (error) {
    console.error("Failed to save message:", error);
  }
}
