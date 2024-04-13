import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ddbRoutes from './routes/ddbRoutes';
import  WebSocket, {WebSocketServer} from 'ws'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/testconnection', ddbRoutes);
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

//websocket server

const server = new WebSocketServer({port:port})

server.on('connect', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message() {
    console.log('received');
  });

  ws.send('something');
  server.clients.forEach( (client)=> {
    if (client.readyState === WebSocket.OPEN) {
      client.send('new status')
    }
  })

});