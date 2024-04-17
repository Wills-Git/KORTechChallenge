// External libraries
import express from 'express';

// Controllers
import userDataController from '../controllers/userDataController';

// Middleware
import validate from '../middleware/validate';

const router = express.Router();

router.get('/allusers', userDataController.getAllUsers);
router.post('/newuser', validate, userDataController.generateAndInsertUser);
router.patch('/update', userDataController.updateUserStatus);

export default router;
