import { UserAttributes } from '../types/types';
import { AWSError } from '../types/types';
import { ddb } from '../config/ddbConnect';
import { docClient } from '../config/ddbConnect';
import { ScanOutput } from 'aws-sdk/clients/dynamodb';

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
      await docClient.transactWrite(transactParams).promise();
      console.log('Transaction Successful');
    } catch (error) {
      console.error('Transaction Failed:', error);
    }
  }

  /**
 * Checks if a DynamoDB table exists.
 * @param {string} tableName - The name of the table to check.
 
 */

  async checkTableExists(tableName: string): Promise<boolean> {
    const params = {
      TableName: tableName,
    };

    try {
      await ddb.describeTable(params).promise();
      return true; // if promise resolves, the table exists
    } catch (err) {
      const error = err as AWSError;
      if (error && error.code === 'ResourceNotFoundException') {
        return false; // The table does not exist
      } else {
        console.error('Error checking table existence:', err);
        throw err; // Re-throw the error to be handled by the caller
      }
    }
  }

  async getAllUsers() {
    const paramsNames = {
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

    const scanOutput: ScanOutput = await docClient.scan(paramsNames).promise();

    return scanOutput.Items;
  }
}
export default UsersModel;
