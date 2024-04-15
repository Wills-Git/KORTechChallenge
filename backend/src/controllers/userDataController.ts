import { NextFunction, Request, Response } from 'express';
import UsersModel from '../models/UsersModel';
import UsersDataService from '../services/usersDataService';
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
      console.error('Error creating user:', error);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersModel.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  },
};

export default userDataController;
