const express = require('express');

const { validateTokenAuth } = require('./middlewares.js');

const router = express.Router();

router.use(validateTokenAuth);

// route to log the client in our system
router.get('/profile', async (req, res) => {
  return res.json(req.user);
});

module.exports = router;
