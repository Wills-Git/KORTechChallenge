import UsersModel from '../models/UsersModel';
import { ddb } from '../config/ddbConnect';
import { UserAttributes } from '../types/types';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  Config,
} from 'unique-names-generator';

/**
 * Service layer for managing user data operations.
 */
class UsersDataService {
  private usersModel: UsersModel;

  /**
   * Initializes a new instance of UsersDataService.
   */
  constructor() {
    this.usersModel = new UsersModel();
  }

  /**
   * Generates user attributes. This function can generate a
   * random name and username if not provided and uses these as primary keys to prevent duplicates.
   *
   * @param {string} [name] - Optional name for the user.
   * @param {string} [username] - Optional username for the user. If not provided, a sanitized version of the generated name is used.
   * @returns {UserAttributes} An object containing user attributes structured for database insertion.
   */
  generateUser(name?: string, username?: string): UserAttributes {
    const nameConfig: Config = {
      dictionaries: [colors, adjectives, names],
      separator: '-',
    };

    const fakeName = uniqueNamesGenerator(nameConfig);
    const fakeUserName = fakeName.replace(/\s/g, '');
    const rand25 = Math.floor(Math.random() * 25);

    return {
      count: {
        PK: `u#${username ? username : fakeUserName}`,
        SK: `"count"`,
        friendAmount: 0,
        postAmount: 0,
      },
      info: {
        PK: `u#${username ? username : fakeUserName}`,
        SK: `"info"`,
        name: `${name ? name : fakeName}`,
        content: `This is a bio of User #${username}.`,
        imageUrl: `https://xsgames.co/randomusers/assets/avatars/pixel/${rand25}.jpg`,
        status: `User hasn't posted a status`,
      },
    };
  }

  /**
   * Generates a dummy database table if it does not already exist, then inserts dummy user data.
   * This function assumes the use of AWS DynamoDB with specified table creation parameters including keys and throughput settings.
   *
   * @returns {Promise<void>} A promise that resolves when the table creation and user insertion processes are complete.
   */
  async generateDummyTable(): Promise<void> {
    console.log('checking if table needs to be made');
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

    const tableExists = await this.usersModel.checkTableExists(
      tableParams.TableName
    );
    if (!tableExists) {
      console.log('Creating table...');
      await ddb.createTable(tableParams).promise();
      console.log('Waiting for the table to be fully created...');
      await ddb
        .waitFor('tableExists', { TableName: tableParams.TableName })
        .promise();
      console.log('Table created. Now inserting users...');
      await this.createAndInsertUsers(200, tableParams.TableName);
    } else {
      console.log('Table already exists');
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
  async createAndInsertUsers(
    numUsers: number,
    tableName: string
  ): Promise<void> {
    const users: UserAttributes[] = [];
    for (let i = 1; i <= numUsers; i++) {
      const userAttributes = await this.generateUser();
      users.push(userAttributes);
    }

    for (const user of users) {
      await this.usersModel.insertUserWithTransaction(user, tableName);
    }
  }
}

export default UsersDataService;
