import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

function WsTest() {
  const clientRef = useRef(null); // Stomp 연결
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    const url = "ws://hyunjin.link/ws/chat";
    if (!clientRef.current) {
      clientRef.current = new Client({
        brokerURL: url,
        //connectHeaders: `Bearer ...`, // 필요한 경우 활성화
        onConnect: () => {
          console.log("Chat WebSocket Connected");
          setIsConnect(true);
        },
        onDisconnect: () => {
          console.log("Disconnected from WebSocket");
          setIsConnect(false);
        },
        onStompError: (frame) => {
          console.error("STOMP Error:", frame.headers.message);
          // 에러 처리 로직 추가 가능
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      clientRef.current.activate();
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  // 연결 상태 로깅
  useEffect(() => {
    console.log("WebSocket connection status:", isConnect);
  }, [isConnect]);

  return <div></div>;
}

export default WsTest;
