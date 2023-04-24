module.exports = async function (globalConfig, projectConfig) {
  // we can also use a system like doppler.com
  require('dotenv').config({ path: './.env-test' });
};
