DB_UIDS = ['fwnejfwlg', 'nfiwopwg', 'wrgjlrwkgplr'];

async function getAll() {
  return DB_UIDS;
}

async function createUid(uid) {
  DB_UIDS.push(uid);
}

async function deleteUid(uid) {
  let index = DB_UIDS.indexOf(uid);
  if (index > -1) {
    DB_UIDS.splice(index, 1);
  } else {
    throw new Error(`unkwnown uid ${uid}`);
  }
}

module.exports = { getAll, createUid, deleteUid };
