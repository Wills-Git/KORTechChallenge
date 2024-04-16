import express from 'express';
import friendDataController from '../controllers/friendDataController';
const router = express.Router();

router.post('/updatefriend', friendDataController.updateFriendStatus);
router.get('/getallfriendstatuses', friendDataController.getAllFriendStatuses);

export default router;
