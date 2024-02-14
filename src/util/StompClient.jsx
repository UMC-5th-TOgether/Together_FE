import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { Client } from "@stomp/stompjs";

function WsTest() {
  const clientRef = useRef(null); //Stomp 연결
  const [isConnect, setIsConnect] = useState(null);

  const connect = (url) => {
    clientRef.current = new Client({
      brokerURL: url,
      //connectHeaders: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiZGVtbyBhcHAiLCJpYXQiOjE3MDc4NDg3OTUsImV4cCI6MTcwNzkzNTE5NX0.u_dWx4SebzJDVSHFFs753kWnRenviBEnKDQZwodPLgWdzcz8CpMIiHpkHeodzbHMLQ8Q-hhTjzzOj5uLwptW6Q`,
      onConnect: () => {
        console.log(clientRef.current.connected);
        setIsConnect(true);
        if (clientRef.current && clientRef.current.connected) {
          console.log("Chat WebSocket Connected");
        }
      },
      onDisconnect: () => {
        setIsConnect(false);
        console.log("Disconnected from WebSocket");
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers.message);
        // 여기에 에러 처리 로직 추가 가능
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 30000,
      heartbeatOutgoing: 30000,
    });
    console.log(clientRef.current.connected);
    clientRef.current.activate();
    console.log(clientRef.current.connected);
  };

  useEffect(() => {
    const url = "ws://localhost:8080/ws/chat";
    connect(url);
  }, []);

  useEffect(() => {
    console.log(isConnect);
  }, [isConnect]);
  return <></>;
}

export default WsTest;
