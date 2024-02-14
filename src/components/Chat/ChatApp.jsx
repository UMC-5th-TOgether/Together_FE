// import React, { useState } from "react";
// import ChatRoomListSample from "./ChatRoomListSample";
// import ChatRoom from "./ChatRoom";
// import chatData from "./Chat.json"; // 채팅 데이터를 가져오는 경로를 확인하세요

// const ChatApp = () => {
//   // 선택된 채팅방 ID를 저장할 상태입니다.
//   const [selectedRoomId, setSelectedRoomId] = useState(null);

//   // 채팅방을 선택할 때 호출되는 함수입니다.
//   const handleSelectRoom = (roomId) => {
//     setSelectedRoomId(roomId);
//   };

//   return (
//     <div className="chat-app">
//       {/* 채팅방 목록을 보여주는 컴포넌트 */}
//       <div className="chat-room-list">
//         {chatData.chatRooms.map((room) => (
//           <ChatRoomListSample
//             key={room.id}
//             room={room}
//             isSelected={selectedRoomId === room.id}
//             onSelectRoom={handleSelectRoom}
//           />
//         ))}
//       </div>

//       {/* 선택된 채팅방의 대화 내용을 보여주는 컴포넌트 */}
//       {selectedRoomId && <ChatRoom selectedRoomId={selectedRoomId} />}
//     </div>
//   );
// };

// export default ChatApp;
