import { UserAttributes } from "../types/types";
import { docClient } from "../config/ddbConnect";

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
