import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import friendRoutes from './routes/friendRoutes';
import WebSocket, { WebSocketServer } from 'ws';
import { initializeDB } from './config/initializeDB';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/u', userRoutes);
app.use('/f', friendRoutes);
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
initializeDB();
//websocket server

const wsServer = new WebSocketServer({ server: server });

server.on('connect', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message() {
    console.log('received');
  });

  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('new status');
    }
  });
});
