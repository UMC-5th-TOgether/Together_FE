// import { Client } from "@stomp/stompjs";

// class StompClient {
//   constructor(brokerURL) {
//     this.client = new Client({
//       brokerURL,
//       onConnect: () => {
//         console.log("Connected to STOMP server");
//       },
//       onDisconnect: () => {
//         console.log("Disconnected from STOMP server");
//       },
//     });
//     this.subscriptions = {}; // 구독 관리를 위한 객체
//   }

//   get isConnected() {
//     return this.client.connected; // 수정된 부분: 연결 상태 확인
//   }

//   activate() {
//     this.client.activate();
//   }

//   deactivate() {
//     this.client.deactivate();
//   }

//   subscribe(destination, callback) {
//     const subscription = this.client.subscribe(destination, callback);
//     this.subscriptions[subscription.id] = subscription;
//     return subscription.id;
//   }

//   unsubscribe(subscriptionId) {
//     if (this.subscriptions[subscriptionId]) {
//       this.subscriptions[subscriptionId].unsubscribe();
//       delete this.subscriptions[subscriptionId];
//     } else {
//       console.error("Subscription not found:", subscriptionId);
//     }
//   }

//   sendMessage(destination, body) {
//     if (this.client.connected) {
//       // 수정된 부분: 연결 상태 확인
//       this.client.publish({ destination, body: JSON.stringify(body) });
//     } else {
//       console.error("STOMP client is not connected.");
//     }
//   }
// }

// export default StompClient;
