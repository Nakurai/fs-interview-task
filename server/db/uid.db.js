DB_UIDS = ['fwnejfwlg', 'nfiwopwg', 'wrgjlrwkgplr'];

async function getAll() {
  return DB_UIDS;
}

async function createUid(uid) {
  DB_UIDS.push(uid);
}

module.exports = { getAll, createUid };
