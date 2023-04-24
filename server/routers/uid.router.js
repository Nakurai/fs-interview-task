const express = require('express');
const crypto = require('crypto');

const { validateTokenAuth } = require('./middlewares.js');
const log = require('../utils/log.js');
const uidDb = require('../db/uid.db.js');
const { DB_PERMISSION } = require('../db/user.db.js');

const router = express.Router();

router.use(validateTokenAuth);

// route to list all generated uid
router.get('/', async (req, res) => {
  try {
    if (!req.user.permissions.includes(DB_PERMISSION.list_uid)) {
      log.error(
        `forbidden access attempt to list uid from ${req.user.username}`
      );
      return res.status(403).send({ error: 'Forbidden' });
    }
    const uids = await uidDb.getAll();
    return res.json({ uids });
  } catch (error) {
    log.error(error.message);
    return res.status(500).send({ error: 'Internal server error' });
  }
});

// route to create a new uid
router.get('/new', async (req, res) => {
  try {
    if (!req.user.permissions.includes(DB_PERMISSION.create_uid)) {
      log.error(
        `forbidden access attempt to create uid from ${req.user.username}`
      );
      return res.status(403).send({ error: 'Forbidden' });
    }
    const uid = crypto.randomBytes(10).toString('hex');
    await uidDb.createUid(uid);
    return res.json({ uid });
  } catch (error) {
    log.error(error.message);
    return res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
