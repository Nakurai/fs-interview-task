function password(toSanitize) {
  const regex = /^[0-9a-zA-Z_\!\.\-*\(@\)\$#]{8,50}$/;
  if (regex.test(toSanitize)) {
    return toSanitize;
  } else {
    throw new Error('password does not match policy');
  }
}
function email(toSanitize) {
  const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(toSanitize)) {
    return toSanitize;
  } else {
    throw new Error(`email ${toSanitize} not valid`);
  }
}

module.exports = { password, email };
