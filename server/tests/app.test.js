const { request } = require('./test-utils');

describe('/GET ping', () => {
  it('should return ping', async () => {
    const res = await request.get('/ping');
    expect(res.text).toContain('pong');
  });
});

describe('/POST api/auth/login', () => {
  it('should fail with wrong pwd policy parameters', async () => {
    const res = await request.post('/api/auth/login').send({
      password: '1234',
      username: 'reader@fs.com',
    });
    expect(res.status).toEqual(401);
  });
  it('should fail with wrong username format', async () => {
    const res = await request.post('/api/auth/login').send({
      password: '1234',
      username: 'reader',
    });
    expect(res.status).toEqual(401);
  });
  it('should fail if user does not exist', async () => {
    const res = await request.post('/api/auth/login').send({
      password: '123456789',
      username: 'nouser@fs.com',
    });
    expect(res.status).toEqual(401);
  });
  it('should fail if wrong password', async () => {
    const res = await request.post('/api/auth/login').send({
      password: '123456789',
      username: 'reader@fs.com',
    });
    expect(res.status).toEqual(401);
  });
  it('should succeed with correct parameters', async () => {
    const res = await request.post('/api/auth/login').send({
      password: 'readerreader',
      username: 'reader@fs.com',
    });
    expect(res.status).toEqual(200);
  });
});

describe('/GET api/uid/', () => {
  it('should fail if no token', async () => {
    const res = await request.get('/api/uid');
    expect(res.status).toEqual(403);
  });
  it('should fail if token not valid', async () => {
    const res = await request.get('/api/uid').set('Bearer', 'token xyz');
    expect(res.status).toEqual(403);
  });
  it('should succeed if token is valid', async () => {
    const res = await request.get('/api/uid').set('Bearer', 'token abc');
    expect(res.status).toEqual(200);
  });
});

describe('/GET api/uid/new', () => {
  it('should fail if no token', async () => {
    const res = await request.get('/api/uid/new');
    expect(res.status).toEqual(403);
  });
  it('should fail if token not valid', async () => {
    const res = await request.get('/api/uid/new').set('Bearer', 'token xyz');
    expect(res.status).toEqual(403);
  });
  it('should fail if user does not have access', async () => {
    const res = await request.get('/api/uid/new').set('Bearer', 'token abc');
    expect(res.status).toEqual(403);
  });
  it('should succeed when everything is okay', async () => {
    const res = await request.get('/api/uid/new').set('Bearer', 'token def');
    expect(res.status).toEqual(200);
  });
});
