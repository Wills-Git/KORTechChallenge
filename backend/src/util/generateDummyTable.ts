
import { docClient } from '../config/ddbConnect';
import generateUser from './generateUser';
import { UserAttributes } from '../types/types';


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


//pushing both inital attributes at the same time keeps the ddb atomic, preventing stray records
async function createAndInsertUsers(numUsers: number, tableName: string) {
  const users: UserAttributes[] = [];
  for (let i = 1; i <= numUsers; i++) {
    const userAttributes = await generateUser(i);
    if (userAttributes) {
      users.push(userAttributes);
    }
  }

  await users.forEach((user) => insertUserWithTransaction(user,tableName));
}




