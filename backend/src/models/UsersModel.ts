// AWS SDK Imports
import type {
  ScanOutput,
  QueryOutput,
  UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb.ts';

// Local configuration imports
import { ddb, docClient } from '../config/ddbConnect';

// Type imports
import type { UserAttributes, AWSError } from '../types/types.ts';

class UsersModel {
  /**
   * Inserts a new user into the specified DynamoDB table using a transaction to ensure atomicity.
   * This function attempts to write both 'count' and 'info' attributes of a user atomically.
   * If either operation fails, the entire transaction is rolled back, ensuring that either
   * both items are successfully written or neither is. This prevents partial writes and maintains
   * data consistency.
   *
   * @async
   * @param {UserAttributes} user - The user attributes to insert. Must include both 'count' and 'info' properties.
   * @param {string} tableName - The name of the DynamoDB table into which the user data should be inserted.
   * @returns {Promise<void>} A promise that resolves if the transaction is successful, or rejects with an error if the transaction fails.
   */
  async insertUserWithTransaction(
    user: UserAttributes,
    tableName: string = String(process.env.TABLENAME)
  ) {
    const transactParams = {
      TransactItems: [
        { Put: { TableName: `${tableName}`, Item: user.count } },
        { Put: { TableName: `${tableName}`, Item: user.info } },
      ],
    };
    try {
      //prevents duplicate users
      if (await this.checkUserExists(user.info.PK)) {
        throw new Error('User Already Exists');
      }
      await docClient.transactWrite(transactParams).promise();
    } catch (error) {
      throw error;
    }
  }

  /**
 * Checks if a DynamoDB table exists.
 * @param {string} tableName - The name of the table to check.
 
 */

  async getAllUsers() {
    const params = {
      TableName: String(process.env.TABLENAME),
      FilterExpression: 'SK = :skValue',
      ExpressionAttributeValues: {
        ':skValue': '"info"', // Prefix to filter the sort key values
      },
      ExpressionAttributeNames: {
        '#name': 'name', //name is reserved keyword
        '#status': 'status', //status is reserved keyword
      },
      ProjectionExpression: 'PK, #name, imageUrl, content, #status',
    };

    const scanOutput: ScanOutput = await docClient.scan(params).promise();

    return scanOutput.Items;
  }

  async checkUserExists(PK: string) {
    const params = {
      TableName: String(process.env.TABLENAME),
      KeyConditionExpression: 'PK = :PK',
      ExpressionAttributeValues: {
        ':PK': PK,
      },
      ProjectionExpression: 'PK',
    };
    const result: QueryOutput = await docClient.query(params).promise();
    // If the query finds any items, it means the user exists.
    const exists: boolean = result.Items?.length ? true : false;
    return exists;
  }
  // I would optimally write a more general 'updateUser' function.
  /**
   * Updates the status attribute for a user in the DynamoDB table.
   *
   * @param {string} PK - The primary key of the user whose status needs to be updated.
   * @param {string} status - The new status to set for the user.
   * @param {string} [tableName=process.env.TABLENAME] - The DynamoDB table to update.
   * @returns {Promise<void>} A promise that resolves if the update is successful, or rejects with an error if the update fails.
   */
  async updateUserStatus(
    PK: string,
    status: string,
    tableName: string = String(process.env.TABLENAME)
  ) {
    const params = {
      TableName: tableName,
      Key: {
        PK,
        SK: '"info"',
      },
      UpdateExpression: 'set #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status', // 'status' is a reserved keyword
      },
      ExpressionAttributeValues: {
        ':status': status,
      },
      ReturnValues: 'UPDATED_NEW', // Returns the attribute as it appears after it is updated
    };

    try {
      const result: UpdateItemOutput = await docClient.update(params).promise();
    } catch (error) {
      throw error;
    }
  }
}
export default UsersModel;
