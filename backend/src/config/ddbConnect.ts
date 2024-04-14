import AWS from 'aws-sdk';
import generateDummyTable from '../util/generateDummyTable';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

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

let ConfigurationOptions: ServiceConfigurationOptions = {
  credentials: dummyCredentials,
  region: 'localhost',
  endpoint: 'http://localhost:8000',
};

//singleton ddb instance
export const ddb = new AWS.DynamoDB(ConfigurationOptions);
//singleton dynamoDB document client
export const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  convertEmptyValues: true,
});

//initializing table with dummy data if it isn't already present
generateDummyTable();
