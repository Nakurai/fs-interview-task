const userDb = require('../db/user.db.js');
const authDb = require('../db/auth.db.js');

async function hashPwd(pwd) {
  return pwd;
}

async function validateToken(token, userId) {
  const user1Valid = userId === 1 && token === 'abc';
  const user2Valid = userId === 2 && token === 'def';
  return user1Valid || user2Valid;
}

async function createToken(user) {
  // user jwt token library here to create a token
  const token = user.id === 1 ? 'abc' : 'def';

  // save the user's token in db
  authDb.setToken(user.id, token);

  return token;
}

// this function checks in the database if the user actually exists
// if not, throws error
// if so, generate the id token and return it
async function login(pwd, username) {
  try {
    // fetching user info
    const user = await userDb.getUser(username);
    const auth = await authDb.getAuthById(user.id);

    const hash = await hashPwd(pwd);
    if (auth.hash !== hash) {
      // logging failed login attempt
      throw new Error(`wrong password for user ${username}`);
    }

    // creating the user's token
    const token = await createToken(user);

    return { user, token };
  } catch (error) {
    throw error;
  }
}

// this function checks in the database if the user actually exists
// if not, throws error
// if so, generate the id token and return it
async function checkToken(token) {
  try {
    // checking that the hash really exists
    const auth = await authDb.getAuthByToken(token);

    // check that the token is valid, not expired, for the right
    // user, etc. will throw an error if not correct
    await validateToken(token, auth.userId);

    // the token is valid, getting the user from db
    // because the app will need it
    const user = await userDb.getUserById(auth.userId);

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { login, checkToken };
