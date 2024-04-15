import express from 'express';
import friendDataController from '../controllers/friendDataController';
const router = express.Router();

router.post('/updatefriend', friendDataController.updateFriendStatus);

export default router;
