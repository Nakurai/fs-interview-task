const express = require('express');
const cors = require('cors');
const app = express();

const log = require('./utils/log.js');

// CORS SETUP
const whitelistDev = ['http://localhost:3000'];
// this would have the actual url used for the app
const whitelistProd = ['http://localhost:3000'];
let whiteList = [];
if (process.env.NODE_ENV === 'dev') {
  whiteList = whitelistDev;
} else if (process.env.NODE_ENV === 'production') {
  whiteList = whitelistProd;
}

let corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
// END CORS

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.get('/ping', (req, res) => {
  return res.send('pong');
});

app.use('/api/auth', require('./routers/auth.router.js'));
app.use('/api/uid', require('./routers/uid.router.js'));
app.use('/api/user', require('./routers/user.router.js'));

// handling unexpected error so the clients know
// logging the error, but providing a generic message to the client
// for security reason.
app.use(function error(err, req, res, next) {
  // Here we would use an actual logging library,
  log.error(err);
  return res.status(500).send({ error: 'Internal Server Error' });
});

app.use((req, res, next) => {
  res.status(404).send({ error: '404 Not Found' });
});

module.exports = app;
