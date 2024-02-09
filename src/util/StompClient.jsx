import { Client } from "@stomp/stompjs";

class StompClient {
  constructor(brokerURL) {
    this.client = new Client({
      brokerURL,
      onConnect: () => {
        console.log("Connected to STOMP server");
      },
      onDisconnect: () => {
        console.log("Disconnected from STOMP server");
      },
    });
    this.subscriptions = {}; // 구독 관리를 위한 객체
  }

  activate() {
    this.client.activate();
  }

  deactivate() {
    this.client.deactivate();
  }

  subscribe(destination, callback) {
    const subscription = this.client.subscribe(destination, callback);
    // 구독 ID를 사용하여 구독 객체 저장
    this.subscriptions[subscription.id] = subscription;
    return subscription.id; // 구독 ID 반환
  }

  unsubscribe(subscriptionId) {
    if (this.subscriptions[subscriptionId]) {
      this.subscriptions[subscriptionId].unsubscribe(); // 구독 해제
      delete this.subscriptions[subscriptionId]; // 저장된 구독 객체 삭제
    } else {
      console.error("Subscription not found:", subscriptionId);
    }
  }

  sendMessage(destination, body) {
    if (this.client.connected) {
      this.client.publish({ destination, body: JSON.stringify(body) });
    } else {
      console.error("STOMP client is not connected.");
    }
  }
}

export default StompClient;
