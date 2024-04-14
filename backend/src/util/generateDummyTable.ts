import { ddb } from '../config/ddbConnect';
import generateUser from './generateUser';
import { UserAttributes } from '../types/types';
import insertUserWithTransaction from './insertUserWithTransaction';
import checkTableExists from './checkTableExists';


/**
 * Asynchronously generates a dummy database table with predefined parameters and checks if the table already exists.
 * If the table does not exist, it creates the table and waits for its creation to complete before inserting 200 dummy users.
 * This function assumes the use of AWS DynamoDB as the database service, with specific parameters for table creation
 * including keys and provisioned throughput settings. After successful table creation, it inserts users using the
 * `createAndInsertUsers` function.
 *
 * @returns {Promise<void>} A promise that resolves when the table creation (if needed) and user insertion is complete.
 */
async function generateDummyTable() {
  const tableParams = {
    TableName: 'KOR',
    KeySchema: [
      { AttributeName: 'PK', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'SK', KeyType: 'RANGE' }, // Sort key
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
  const tableExists = await checkTableExists(tableParams.TableName);
  if (!tableExists) {
    console.log('Creating table...');
    await ddb.createTable(tableParams).promise(); // Make sure to await the promise
    console.log('Waiting for the table to be fully created...');
    await ddb
      .waitFor('tableExists', { TableName: tableParams.TableName })
      .promise();
    console.log('Table created. Now inserting users...');
    await createAndInsertUsers(200, tableParams.TableName);
  } else {
    console.log('Table already exists')
  }


 /** Asynchronously creates and inserts a specified number of user records into a database table.
 * This function first generates user attributes using the `generateUser` function for each user,
 * logs them to the console if they are valid, and collects them into an array. After generating all
 * users, it inserts each one into the specified table using the `insertUserWithTransaction` function.
 * 
 * @param {number} numUsers - The number of user records to generate and insert.
 * @param {string} tableName - The name of the database table where user records will be inserted.
 * @returns {Promise<void>} A promise that resolves when all users have been inserted successfully.
 */
  async function createAndInsertUsers(numUsers: number, tableName: string) {
    const users: UserAttributes[] = [];
    for (let i = 1; i <= numUsers; i++) {
      const userAttributes = await generateUser();
      if (userAttributes) {
        console.log(userAttributes);
        users.push(userAttributes);
      }
    }

    for (const user of users) {
      await insertUserWithTransaction(user, tableName);
    }
  }
}
export default generateDummyTable;
