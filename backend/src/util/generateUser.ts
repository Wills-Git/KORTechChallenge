
import { UserAttributes } from '../types/types';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  Config,
} from 'unique-names-generator';

/**
 * Generates user attributes, including user statistics and information, for a new or existing user.
 * The function optionally accepts a name and username; if not provided, it generates a unique fake name and username
 * using a combination of colors, adjectives, and names. The fake username is used as a primary key to prevent duplicates.
 * It also assigns a random avatar from a predefined set of avatars. The function returns an object with separate
 * attributes for user statistics and information. Although the setup suggests asynchronous behavior, the function
 * operates synchronously and returns directly without waiting for any asynchronous operations.
 *
 * @param {string} [name] - An optional name for the user. If not provided, a random name is generated.
 * @param {string} [username] - An optional username. If not provided, a sanitized version of the generated name is used as the username.
 * @returns {Object} An object containing separate user attributes for statistics and information.
 */
 function generateUser(name?: string, username?: string) {
  const nameConfig: Config = {
    dictionaries: [colors, adjectives, names],
    separator: '-',
  };

  const fakeName = uniqueNamesGenerator(nameConfig);
  //use fakename as primary key to prevent duplicates
  const fakeUserName = fakeName.replace(/\s/g, '');
  const rand25 = Math.floor(Math.random() * 25);
  const attributesInit: UserAttributes = {
    count: {
      PK: `u#${username ? username : fakeUserName}`, // Partition key
      SK: `"count"`, // Sort key for user's stats
      friendAmount: 0,
      postAmount: 0,
    },
    info: {
      PK: `u#${username ? username : fakeUserName}`, // Partition key
      SK: `"info"`, // Sort key for user's info
      name: `${name ? name : fakeName}`,
      content: `This is a bio of User #${username}.`,
      imageUrl: `https://xsgames.co/randomusers/assets/avatars/pixel/${rand25}.jpg`,
      status: `User hasn't posted a status`,
    },
  };

  return attributesInit;
}

export default generateUser;
