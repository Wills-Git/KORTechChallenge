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
      dictionaries: [names],
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
}

export default UsersDataService;
