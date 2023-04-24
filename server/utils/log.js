function info(str) {
  // do not log anything in test mode
  if (process.env.NODE_ENV !== 'test') {
    // here we could also use a dedicated library
    console.log(str);
  }
}
function error(str) {
  // do not log anything in test mode
  if (process.env.NODE_ENV !== 'test') {
    // here we could also use a dedicated library
    console.error('ERROR: ' + str);
  }
}

module.exports = { info, error };
