const express = require('express');

const san = require('../utils/sanitize.js');
const log = require('../utils/log.js');
const authCtrl = require('../controllers/auth.js');

const router = express.Router();

// route to log the client in our system
router.post('/login', async (req, res) => {
  const body = req.body;
  let password = '';
  let username = '';
  try {
    password = san.password(body.password || '');
    username = san.email(body.username || '');
    const { user, token } = await authCtrl.login(password, username);
    return res.json({ user, token });
  } catch (error) {
    log.error(error.message);
    return res.status(401).send({ error: 'wrong password or username' });
  }
});

// route to log the client out of our
router.get('/logout', async (req, res) => {
  try {
    // here we would clean up any session related object
    // we don't have any in this example, so just returning okay
    return res.json({ ok: true });
  } catch (error) {
    log.error(error.message);
    return res.status(401).send({ error: 'wrong password or username' });
  }
});

module.exports = router;
