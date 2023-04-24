const app = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);

module.exports = { request: requestWithSupertest };
