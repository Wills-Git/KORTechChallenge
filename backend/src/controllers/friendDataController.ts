// External libraries
import { NextFunction, Request, Response } from 'express';
import { QueryInput} from 'aws-sdk/clients/dynamodb';

// Local configuration imports
import { docClient, ddb } from '../config/ddbConnect';

// Type imports
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
    const userParams = {
      TableName: String(process.env.TABLENAME),
      Item: {
        PK: `${userPK}#friendstatus`,
        SK: requestedUserPK,
        Status: status,
      },
    };
    const requestedUserParams = {
      TableName: String(process.env.TABLENAME),
      Item: {
        PK: `${requestedUserPK}#friendstatus`,
        SK: userPK,
        Status: friendStatusMap[status],
      },
    };
    const params = {
      TransactItems: [{ Put: userParams }, { Put: requestedUserParams }],
    };

    try {
      await docClient.transactWrite(params).promise();
      res.status(200).json(userPK); //send back userPK for redux to use with invalidating cache
    } catch (error) {
      let errorMessage = 'unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json(errorMessage);
    }
  },
  /**
   * Retrieves all friend statuses for a specific user.
   * @param {string} userPk - The partition key of the user whose friend statuses are being queried.
   * @returns {Promise} A promise that resolves with the list of all friend statuses.
   */
  getAllFriendStatuses: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userPK } = req.params;
    const queryParams: QueryInput = {
      TableName: String(process.env.TABLENAME),
      KeyConditionExpression: 'PK = :PK and begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':PK': { S: `${userPK}#friendstatus` },
        ':skPrefix': { S: 'u#' },
      },
    };

    try {
      const data = await ddb.query(queryParams).promise();

      res.status(200).json(data.Items);
    } catch (error) {
      let errorMessage = 'unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json(errorMessage);
    }
  },
};

export default friendDataController;
