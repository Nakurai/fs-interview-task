const userDb = require('../../db/user.db.js');

describe('Get user', () => {
  it('should fail if username is unknwown', async () => {
    try {
      await userDb.getUser('not a user');
      // the previous call should throw an error
      expect(1).toEqual(2);
    } catch (error) {
      expect(error.message).toEqual("username 'not a user' does not exist");
    }
  });
  it('should succeed if username exists', async () => {
    const user = await userDb.getUser('reader@fs.com');
    expect(user.username).toEqual('reader@fs.com');
    expect(user.permissions.includes('list_uid')).toEqual(true);
  });
});
