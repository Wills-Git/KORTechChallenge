import axios from 'axios'



/**
 * Asynchronously generates user attributes for a new user with a specified user ID.
 * The function fetches a random name from an external API and generates a random avatar
 * from a set list of avatars. It initializes user attributes for both user statistics
 * and user information.
 *
 * @async
 * @function generateUser
 * @param {number} userid - The unique identifier for the user.
 * @returns {Promise<Object[]>} A promise that resolves to an array of objects, each representing
 *                              user attributes for different aspects of the user (e.g., stats, info).
 *
 * @example
 * async function createUserProfile(userid) {
 *   const userAttributes = await generateUser(userid);
 *   console.log(userAttributes);
 *   // Additional code to use the userAttributes
 * }
 */
async function generateUser(userid: Number) {
const fakeName = await axios.get('//api.name-fake.com/random/random');
const rand25= Math.floor(Math.random() * 25)
const attributesInit ={
    count: {
      PK: `u#${userid}`, // Partition key
      SK: `"count"`, // Sort key for user's stats
      friendAmount: 0,
      postAmount: 0,
    },
    info: {
      PK: `u#${userid}`, // Partition key
      SK: `"info"`, // Sort key for user's info
      name: `${fakeName}`,
      content: `This is a bio of User #${userid}.`,
      imageUrl: `https://xsgames.co/randomusers/assets/avatars/pixel/${rand25}.jpg`,
      status: `User hasn't posted a status`,
    },
}

return attributesInit
    }

    export default generateUser