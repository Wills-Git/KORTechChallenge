import { ddb } from '../config/ddbConnect';
import { AWSError } from '../types/types';

/**
 * Checks if a DynamoDB table exists.
 * @param {string} tableName - The name of the table to check.
 
 */

async function checkTableExists(tableName: string): Promise<boolean> {
  const params = {
    TableName: tableName,
  };

  try {
    await ddb.describeTable(params).promise(); // Using .promise() to handle as a Promise
    return true; // The table exists
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

export default checkTableExists;
