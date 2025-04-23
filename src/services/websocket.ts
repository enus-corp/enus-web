import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface ChatSession {
  chatId: string;
  timestamp: string;
}

class WebSocketService {
  private client: Client | null = null;
  private chatId: string | null = null;

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private initializeClient() {
    const accessToken = this.getAccessToken();
    
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
      this.subscribeToUserQueue();
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
    };
  }

  private subscribeToUserQueue() {
    if (!this.client?.connected) return;

    this.client.subscribe('/user/queue/chat', (message) => {
      const sessionInfo: ChatSession = JSON.parse(message.body);
      this.chatId = sessionInfo.chatId;
      console.log('Received chat session:', sessionInfo);
    });
  }

  public async connect(): Promise<void> {
    // Only initialize if not already initialized
    if (!this.client) {
      this.initializeClient();
    }

    // Only connect if not already connected
    if (this.client && !this.client.connected) {
      await this.client.activate();
    }
  }

  public async requestNewChat(): Promise<string> {
    if (!this.client?.connected) {
      await this.connect();
    }

    return new Promise((resolve) => {
      this.client?.publish({
        destination: '/app/request-chat-id',
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      });

      // Wait for the chat ID to be assigned
      const checkInterval = setInterval(() => {
        if (this.chatId) {
          clearInterval(checkInterval);
          resolve(this.chatId);
        }
      }, 100);
    });
  }

  public sendMessage(message: string) {
    if (!this.client?.connected || !this.chatId) {
      throw new Error('WebSocket not connected or no chat session');
    }

    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify({
        chatId: this.chatId,
        content: message,
        timestamp: new Date().toISOString(),
      }),
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  }

  public disconnect() {
    if (this.client?.connected) {
      this.client.deactivate();
    }
  }
}

export const websocketService = new WebSocketService(); 