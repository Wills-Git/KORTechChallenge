import AWS from 'aws-sdk';
import axios from 'axios';
import checkTableExists from '../util/checkTableExists';

const accessKeyId = String(process.env.ACCESSKEY);
const secretAccessKey = String(process.env.SECRETKEY);
//use settings from env to configure connection to
const dummyCredentials = new AWS.Credentials({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});
AWS.config.update({
  credentials: dummyCredentials,
  region: 'localhost',
});
//singleton dynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  convertEmptyValues: true,
});



//initializing table with dummy data if it isn't already present
const ddb = new AWS.DynamoDB();
export {docClient,ddb};
