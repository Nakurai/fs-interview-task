const DB_AUTH = [
  // this is the reader
  {
    id: 1,
    userId: 1,
    hash: 'readerreader',
    token: 'abc',
    created: '2023-04-21',
    upated: '2023-04-21',
  },
  // and the admin
  {
    id: 2,
    userId: 2,
    hash: 'adminadmin',
    token: 'def',
    created: '2023-04-21',
    upated: '2023-04-21',
  },
];

// get user auth information
async function getAuthById(userId) {
  const auth = DB_AUTH.find((a) => a.userId === userId);
  if (!auth) {
    throw new Error(`user '${userId}' does not exist`);
  }

  return auth;
}

// get user auth information given a token
async function getAuthByToken(token) {
  const auth = DB_AUTH.find((a) => a.token === token);
  if (!auth) {
    throw new Error(`token '${token}' does not exist`);
  }

  return auth;
}

// set a new token for the specified user
async function setToken(userId, token) {
  const userIndex = DB_AUTH.findIndex((a) => a.userId === userId);
  if (userIndex === -1) {
    throw new Error(`user '${userId}' does not exist`);
  }
  DB_AUTH[userIndex].token = token;

  return null;
}

module.exports = { getAuthById, setToken, getAuthByToken };
