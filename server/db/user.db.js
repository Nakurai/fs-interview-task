const DB_PERMISSION = {
  list_uid: 'list_uid',
  create_uid: 'create_uid',
  delete_uid: 'delete_uid',
};

// users have roles. Roles have permissions
// this system allows us to decouple the permission used
// in the backend from the user's roles.
const DB_ROLE = [
  { code: 'reader', label: 'Reader', permissions: [DB_PERMISSION.list_uid] },
  {
    code: 'admin',
    label: 'Admin',
    permissions: [
      DB_PERMISSION.list_uid,
      DB_PERMISSION.create_uid,
      DB_PERMISSION.delete_uid,
    ],
  },
];

const DB_USER_PROFILE = [
  { id: 1, username: 'reader@fs.com', roles: ['reader'] },
  { id: 2, username: 'admin@fs.com', roles: ['admin'] },
];

// fetch users in database
// throw error if their username does not exist
async function getUser(username) {
  const user = DB_USER_PROFILE.find((u) => u.username === username);
  if (!user) {
    throw new Error(`username '${username}' does not exist`);
  }

  const roles = DB_ROLE.filter((r) => user.roles.includes(r.code));
  user.permissions = [].concat.apply(
    [],
    roles.map((r) => r.permissions)
  );

  return user;
}

// fetch users in database
// throw error if their id does not exist
async function getUserById(userId) {
  const user = DB_USER_PROFILE.find((u) => u.id === userId);
  if (!user) {
    throw new Error(`user '${userId}' does not exist`);
  }

  const roles = DB_ROLE.filter((r) => user.roles.includes(r.code));
  user.permissions = [].concat.apply(
    [],
    roles.map((r) => r.permissions)
  );

  return user;
}

module.exports = { getUser, getUserById, DB_PERMISSION };
