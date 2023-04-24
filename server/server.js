/**********************************
 * Submission for the offer listed on freelance.com
 * https://www.freelancer.com/projects/nodejs/Senior-Fullstack-Node-React-Expert/details
/********************************** */

// we can also use a system like doppler.com,
// or set the environement variables via a deploy script
// !! THE .ENV FILES WOULD NOT BE COMMITED IN A NORMAL ENVIRONEMENT

let envPath = `${__dirname}/.env.dev`;
if (process.env.NODE_ENV === 'production') {
  env_path = `${__dirname}/.env.production`;
} else if (process.env.NODE_ENV === 'test') {
  env_path = `${__dirname}/.env.test`;
}
require('dotenv').config({ path: envPath });

const log = require('./utils/log.js');

const app = require('./app.js');

const port = process.env.FS_SERVER_PORT || 3000;

app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
});
