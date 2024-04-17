import { Server as HttpServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<WebSocket, any>;

  constructor(server: HttpServer) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map();

    this.wss.on('connection', (ws: WebSocket) => {
      this.handleConnection(ws);
    });
  }

  private handleConnection(ws: WebSocket): void {
    ws.on('message', (message: string) => {
      console.log('Received message:', message);
    });

    ws.on('close', () => {
      this.clients.delete(ws);
      console.log('Connection closed');
    });

    this.clients.set(ws, {}); 
  }

  public notifyFriends(userId: string, message: object): void {
    this.clients.forEach((_, ws) => {
      if (this.isFriend(userId, ws)) {
        ws.send(JSON.stringify(message));
      }
    });
  }

  private isFriend(userId: string, ws: WebSocket): boolean {
    return true; // Placeholder logic
  }
}

export default WebSocketService;
