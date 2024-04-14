import express, { Request, Response } from 'express';
import { docClient } from '../config/ddbConnect';
import validate from '../middleware/validate';

const router = express.Router();
const tname = 'KOR';
// test ability to post data to local dynamodb instance
router.post('/test', validate, async (req: Request, res: Response) => {
  try {
    const { userId, name, content, imageUrl, etc } = req.body;
    const paramsInfo = {
      TableName: tname,
      Item: {
        PK: `u#${userId}`,
        SK: '"info"',
        name,
        content,
        imageUrl,
        etc,
      },
    };
    const paramsCount = {
      TableName: tname,
      Item: {
        PK: `u#${userId}`,
        SK: '"count"',
        followerCount: 0,
        followingCount: 0,
        postCount: 0,
      },
    };
    //puts both items in so if one fails, the other isn't added, maintaining data consistency
    await Promise.all([
      docClient.put(paramsInfo).promise(),
      docClient.put(paramsCount).promise(),
    ]);

    //query parameter to grab all usernames
    const paramsNames = {
      TableName: tname,
      FilterExpression: 'SK = :skValue',
      ExpressionAttributeValues: {
        ':skValue': '"info"', // Prefix to filter the sort key values
      },
      ExpressionAttributeNames: {
        '#name': 'name', //name is reserved keyword
      },
      ProjectionExpression: 'PK, #name, imageUrl,content, status',
    };

    const names = await docClient.scan(paramsNames).promise();

    res.status(200).json({ users: names.Items });
  } catch (error) {
    console.error('error adding new user/ get all users', error);
    res.status(500).json({ error: 'failed to add user' });
  }
});

export default router;
