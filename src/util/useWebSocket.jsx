// useWebSocket.js
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

const useWebSocket = (url) => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    clientRef.current = new Client({
      brokerURL: url,
      onConnect: () => {
        console.log("WebSocket 연결됨");
        setIsConnected(true);
      },
      onDisconnect: () => {
        console.log("WebSocket 연결 끊김");
        setIsConnected(false);
      },
      // 여기에 에러 처리 로직 추가 가능
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers.message);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 30000,
      heartbeatOutgoing: 30000,
    });

    clientRef.current.activate();
    return () => {
      clientRef.current.deactivate();
    };
  }, [url]);

  return { isConnected, client: clientRef.current };
};

export default useWebSocket;
