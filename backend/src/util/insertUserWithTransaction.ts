import { UserAttributes } from "../types/types";
import { docClient } from "../config/ddbConnect";

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
async function insertUserWithTransaction(
  user: UserAttributes,
  tableName: string
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

export default insertUserWithTransaction