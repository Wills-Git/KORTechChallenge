import AWS from 'aws-sdk';
const accessKeyId = String(process.env.ACCESSKEY) ;
const secretAccessKey = String(process.env.SECRETKEY) ;
//use settings from env to configure connection to
const dummyCredentials = new AWS.Credentials({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});
AWS.config.update({
  credentials: dummyCredentials,
  region: 'localhost',
});
const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  convertEmptyValues: true,
});

//TODO: Db init, single table, with relevant data [username, displayname, status, friend list]

export default docClient;
