// External libraries
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import WebSocket, { WebSocketServer } from 'ws';

// Configuration and initialization files
import { initializeDB } from './config/initializeDB';

// Routes
import userRoutes from './routes/userRoutes';
import friendRoutes from './routes/friendRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/u', userRoutes);
app.use('/f', friendRoutes);
const port = 3000;

const server = app.listen(port, () => {});
initializeDB();
//websocket server can share same port
const wsServer = new WebSocketServer({ server: server });
