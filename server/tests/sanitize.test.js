const sanitize = require('../utils/sanitize.js');

describe('Paswords', () => {
  it('should fail when too small', () => {
    expect(() => sanitize.password('a')).toThrow(
      new Error('password does not match policy')
    );
  });
  it('should fail when too long', () => {
    expect(() =>
      sanitize.password('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1')
    ).toThrow(new Error('password does not match policy'));
  });
  it('should fail when containing forbidden characters', () => {
    expect(() => sanitize.password('12345678<>')).toThrow(
      new Error('password does not match policy')
    );
  });
  it('should succeed when okay', () => {
    const pwd = '1234abcd_!.-*(@)$#';
    expect(sanitize.password(pwd)).toEqual(pwd);
  });
});

describe('Email', () => {
  it('should fail when no @', () => {
    expect(() => sanitize.email('a.com')).toThrow(new Error('email not valid'));
  });
  it('should succeed when okay', () => {
    const email = 'abc.123-test@test.com';
    expect(sanitize.email(email)).toEqual(email);
  });
});
