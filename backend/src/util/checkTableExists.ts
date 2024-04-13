import { ddb } from '../config/ddbConnect';

/**
 * Checks if a DynamoDB table exists.
 * @param {string} tableName - The name of the table to check.
 
 */
function checkTableExists(tableName: string) {
  const params = {
    TableName: tableName,
  };

  ddb.describeTable(params, function (err, data) {
    if (err) {
      if (err.code === 'ResourceNotFoundException') {
        return false;
      } else {
        console.error(err);
      }
    } else {
      //table exists
      return true;
    }
  });
}

export default checkTableExists