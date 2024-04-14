import express, { Request, Response } from 'express';
import userDataController from '../controllers/userDataController';

import validate from '../middleware/validate';

const router = express.Router();

router.get('/allusers', userDataController.getAllUsers);
router.post('/newuser', validate, userDataController.generateAndInsertUser);

export default router;
