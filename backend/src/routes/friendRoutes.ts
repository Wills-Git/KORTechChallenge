// External libraries
import express from 'express';

// Controllers
import friendDataController from '../controllers/friendDataController';

const router = express.Router();

router.post('/updatefriend', friendDataController.updateFriendStatus);
router.get(
  '/getallfriendstatuses/:userPK',
  friendDataController.getAllFriendStatuses
);

export default router;
