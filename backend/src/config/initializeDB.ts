
// Models
import UsersModel from '../models/UsersModel';

// Services
import UsersDataService from '../services/usersDataService';

// Configuration
import { ddb } from './ddbConnect';

// Type imports
import { UserAttributes, AWSError } from '../types/types';

export async function initializeDB() {
  const usersModel = new UsersModel();
  const usersDataService = new UsersDataService();
  /**
   * Generates a dummy database table if it does not already exist, then inserts dummy user data.
   * This function assumes the use of AWS DynamoDB with specified table creation parameters including keys and throughput settings.
   *
   * @returns {Promise<void>} A promise that resolves when the table creation and user insertion processes are complete.
   */
  async function generateDummyTable(): Promise<void> {
     
    const tableParams = {
      TableName: String(process.env.TABLENAME),
      KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH' },
        { AttributeName: 'SK', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'PK', AttributeType: 'S' },
        { AttributeName: 'SK', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

     async function checkTableExists(tableName: string): Promise<boolean> {
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
        throw err; // Re-throw the error to be handled by the caller
      }
    }
  }

    const tableExists = await checkTableExists(
      tableParams.TableName
    );
    if (!tableExists) {
       console.log('Creating table...')
      await ddb.createTable(tableParams).promise();
       
      await ddb
        .waitFor('tableExists', { TableName: tableParams.TableName })
        .promise();
       console.log('Creating users...')
      await createAndInsertUsers(200, tableParams.TableName);
    } else {
       
    }
  }

  /**
   * Creates and inserts a specified number of users into a DynamoDB table.
   * Each user is generated using `generateUser` and inserted using `insertUserWithTransaction`.
   *
   * @param {number} numUsers - The number of user records to generate and insert.
   * @param {string} tableName - The name of the database table where user records will be inserted.
   * @returns {Promise<void>} A promise that resolves when all users have been successfully inserted.
   */
  async function createAndInsertUsers(
    numUsers: number,
    tableName: string
  ): Promise<void> {
    const users: UserAttributes[] = [];
    for (let i = 1; i <= numUsers; i++) {
      const userAttributes = await usersDataService.generateUser();
      users.push(userAttributes);
    }

    for (const user of users) {
      await usersModel.insertUserWithTransaction(user, tableName);
    }
  }

  await generateDummyTable();
   
}
