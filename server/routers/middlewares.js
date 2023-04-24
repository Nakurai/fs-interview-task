const log = require('../utils/log.js');
const san = require('../utils/sanitize.js');

const authCtrl = require('../controllers/auth.js');

// middleware to use when paths needs authentication access
async function validateTokenAuth(req, res, next) {
  try {
    const headers = req.headers;

    // the header Bearer token xxxxx should exist
    if (!headers['bearer']) {
      log.error(`forbidden access attempt to ${req.originalUrl}`);
      return res.status(403).send({ error: 'Forbidden' });
    }

    // extracting the token from the header
    const token = headers['bearer'].replace(/^token\s/, '');
    try {
      // checking the token validity
      const user = await authCtrl.checkToken(token);

      // adding the user profile to the request object
      req.user = user;
      next();
    } catch (error) {
      log.error(`token ${token} is not valid`);
      return res.status(403).send({ error: 'Forbidden' });
    }
  } catch (error) {
    log.error(error.message);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

module.exports = { validateTokenAuth };
