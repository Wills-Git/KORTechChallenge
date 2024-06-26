// External libraries
import { NextFunction, Request, Response } from 'express';

// Models
import UsersModel from '../models/UsersModel';

// Services
import UsersDataService from '../services/usersDataService';

// Type imports
import { UserAttributes } from '../types/types';

const usersModel = new UsersModel();
const usersDataService = new UsersDataService();

const userDataController = {
  generateAndInsertUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, username } = req.body;
    try {
      // Generate user attributes
      const user: UserAttributes = usersDataService.generateUser(
        name,
        username
      );
      const response = user.info;
      // Insert user into the database with transaction
      await usersModel.insertUserWithTransaction(user);
      // Send a successful response back to the client
      res.status(200).json(response);
    } catch (error) {
      let errorMessage = 'unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json(errorMessage);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersModel.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {}
  },
  updateUserStatus: async (req: Request, res: Response, next: NextFunction) => {
    const { PK, status } = req.body; // Assume PK and status are sent in the body

    if (!PK || !status) {
      return res.status(400).json({ message: 'PK and status are required.' });
    }

    try {
      await usersModel.updateUserStatus(PK, status);
      res.status(200).json({ message: 'User status updated successfully.' });
    } catch (error) {
      let errorMessage = 'Failed to update user status';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ message: errorMessage });
    }
  },
};

export default userDataController;
