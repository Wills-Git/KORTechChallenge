import { NextFunction, Request, Response } from 'express';
import { ddb } from '../config/ddbConnect';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { FriendStatusMap } from '../types/types';

const friendDataController = {
  /**
   * Adds a friend request to the user's incoming requests list and updates the otherUser's outgoing requests list.
   * @param {string} userPk - The partition key of the user who is receiving the friend request.
   * @param {string} otherUserPk - The partition key of the user who is sending the friend request.
   * @returns {Promise} A promise that resolves when both operations are completed.
   */
  updateFriendStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userPK, requestedUserPK, status } = req.body;
    const friendStatusMap: FriendStatusMap = {
      // request sent, requested user has pending status
      requested: 'pending',
      // request accepted
      friends: 'friends',
      // one user blocks another
      block: 'blocked',
      // requested declines, status is wiped
      '': '',
    };
    // checks if status is valid
    function isKeyOfFriendStatusMap(key: any): key is keyof FriendStatusMap {
      return key in friendStatusMap;
    }
    //returns errpr if not
    if (!isKeyOfFriendStatusMap(status)) {
      res.status(400).send('Invalid friend status');
      return;
    }
    const userParams: PutItemInput = {
      TableName: String(process.env.TABLENAME),
      Item: {
        PK: { S: `u#${userPK}#friendstatus` },
        SK: { S: `u#${requestedUserPK}` },
        Status: { S: `${status}` },
      },
    };
    const requestedUserParams = {
      TableName: String(process.env.TABLENAME),
      Item: {
        PK: { S: `u#${requestedUserPK}#friendstatus` },
        SK: { S: `u#${userPK}` },
        Status: { S: `${friendStatusMap[status]}` },
      },
    };
    try {
      await ddb.putItem(userParams);
      await ddb.putItem(requestedUserParams);
      res.status(200);
      console.log('Friend status updated');
    } catch (error) {
      console.error('Failed update friend status:', error);
      let errorMessage = 'unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json(errorMessage);
    }
  },
};

export default friendDataController;
