const { Service } = require('feathers-nedb');
const crypto = require('crypto');

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';

exports.Users = class Users extends Service {
  create (data, params) {
    // This is the information we want from the user signup data
    const { email, password, githubId } = data;

    // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
    try{
    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    } catch (error) {
        console.error('Could not get email from github API');
    }
    // The full avatar URL
    const avatar = `${gravatarUrl}/${hash}?${query}`;
    // The complete user
    const userData = {
      email,
      password,
      githubId,
      avatar
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
};
