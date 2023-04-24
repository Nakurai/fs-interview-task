const authDb = require('../../db/auth.db.js');

describe('Get user', () => {
  it('should fail if user is unknwown', async () => {
    try {
      await authDb.getAuthById(0);
      // the previous call should throw an error
      expect(1).toEqual(2);
    } catch (error) {
      expect(error.message).toEqual("user '0' does not exist");
    }
  });
  it('should succeed if user id exists', async () => {
    const auth = await authDb.getAuthById(1);
    expect(auth.userId).toEqual(1);
  });
});
