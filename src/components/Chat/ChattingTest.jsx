// import { useRef, useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import * as StompJs from '@stomp/stompjs';
// import styles from './style.module.scss';
// import { MbtiContext } from '../../Context/MbtiContext';
// import styled from 'styled-components';
// import ChatMessageForm from '../../components/styled-components/ChatMessageForm';
// import UserInfo from '../../components/styled-components/UserInfo';

// interface Chat {
//   id: number;
//   content: string;
//   isMine: boolean;
//   time: string;
//   nickname: string;
// }

// interface WatingRoomBody {
//   type: string;
//   roomId: number;
//   sendUserId?: string;
//   content?: string;
// }

// interface MessageBody {
//   type: string;
//   sendUserId: string;
//   content: string;
//   time: string;
//   nickname: string;
// }

// interface StyledMessageProps {
//   isMine: boolean;
// }

// const ChatPage: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const { selectedMbti } = useContext(MbtiContext);
//   const client = useRef<any>({});
//   const [chatList, setChatList] = useState<Chat[]>([]);
//   const [chat, setChat] = useState<string>('');
//   const [roomId, setRoomId] = useState<number>();
//   const userNickname = localStorage.getItem('nickname');
//   const [isMatch, setIsMatch] = useState<boolean>(false);
//   // 고유한 ID를 발급하는 함수
//   const generateId = (() => {
//     let id = 0;
//     return () => {
//       id += 1;
//       return id;
//     };
//   })();

//   const disconnect = () => {
//     client.current.deactivate();
//     console.log('채팅이 종료되었습니다.');
//     setIsMatch(false);
//   };

//   const onMessageReceived = (message: StompJs.Message) => {
//     const messageBody = JSON.parse(message.body) as MessageBody;
//     const { type, sendUserId, content, time, nickname } = messageBody;
//     const isMine = sendUserId === userId;
//     const newChat = {
//       id: generateId(),
//       content,
//       isMine,
//       time,
//       nickname,
//     };
//     console.log(newChat);
//     setChatList((prevChatList) => [...prevChatList, newChat]);
//     console.log(chatList);

//     if (type === 'close') {
//       console.log('closed');
//     }
//   };

//   const subscribeAfterGetRoomId = (id: number) => {
//     client.current.subscribe(`/sub/chat/match/${id}`, onMessageReceived);
//   };

//   const publishAfterGetRoomId = (event: React.FormEvent<HTMLFormElement>, content: string) => {
//     event.preventDefault();
//     if (!client.current.connected) return;

//     client.current.publish({
//       destination: `/pub/chat/match/${roomId}`,
//       body: JSON.stringify({
//         type: 'match',
//         roomId,
//         sendUserId: userId,
//         content,
//       }),
//     });

//     setChat('');
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setChat(event.target.value);
//   };

//   // 최초 렌더링시 실행
//   useEffect(() => {
//     const subscribe = () => {
//       client.current.subscribe(`/sub/chat/wait/${userId}`, (body) => {
//         const watingRoomBody = JSON.parse(body.body) as WatingRoomBody;
//         const { type, roomId: newRoomId } = watingRoomBody;

//         if (type === 'open') {
//           console.log('채팅 웨이팅 시작');
//         }

//         if (type === 'match') {
//           console.log('매칭이 되었습니다!');
//           subscribeAfterGetRoomId(newRoomId);
//           setRoomId(newRoomId);
//           setIsMatch(true);
//         }
//       });
//     };

//     const publishOnWait = () => {
//       if (!client.current.connected) return;

//       client.current.publish({
//         destination: '/pub/chat/wait',
//         body: JSON.stringify({
//           type: 'open',
//           userId,
//           selectMbti: `${selectedMbti}`,
//         }),
//       });
//     };

//     const connect = () => {
//       client.current = new StompJs.Client({
//         brokerURL: 'ws://api.projectsassy.net:8080/ws',
//         onConnect: () => {
//           console.log('success');
//           subscribe();
//           publishOnWait();
//         },
//       });
//       client.current.activate();
//     };

//     connect();

//     return () => disconnect();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   return (
//     <div className={styles.ChatPage}>
//       <div className={styles.ChatPage__form}>
//         <div className={styles.ChatPage__form__participants}>
//           <UserInfo user={userNickname} />
//           {isMatch ? (
//             <UserInfo user={userNickname} />
//           ) : (
//             <span>{selectedMbti}와의 채팅을 기다리는 중...</span>
//           )}
//         </div>

//         <div className={styles.ChatPage__form__chatform}>
//           {/* 채팅 시작시 알림 */}
//           <div className={styles.ChatPage__form__chatlist}>
//             {chatList.map((chatt: Chat) => (
//               <StyledMessage key={chatt.id} isMine={chatt.isMine}>
//                 <span>{chatt.content}</span>
//                 <span>{chatt.time}</span>
//               </StyledMessage>
//             ))}
//           </div>
//           {/* 채팅 종료시 알림 */}
//           <ChatMessageForm
//             publishAfterGetRoomId={publishAfterGetRoomId}
//             handleChange={handleChange}
//             chat={chat}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const StyledMessage = styled.div<StyledMessageProps>`
//   display: flex;
//   flex-direction: ${(props) => (props.isMine ? 'row-reverse' : 'row')};
//   margin: 20px;
//   background-color: #f2f2f2;
//   align-items: end;

//   > span {
//     :nth-child(1) {
//       border: none;
//       border-radius: 5px;
//       padding: 5px 8px;
//       background-color: ${(props) =>
//         props.isMine ? 'var(--chat-background-you)' : 'var(--chat-background-me)'};
//     }
//     :nth-child(2) {
//       font-size: 10px;
//       color: #949494;
//       border: none;
//       border-radius: 5px;
//       padding: 5px 8px;
//       background-color: #f2f2f2;
//     }
//   }
// `;

// export default ChatPage;
// 출처: https://1yoouoo.tistory.com/15 [blanc:티스토리]
