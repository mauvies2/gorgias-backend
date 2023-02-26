function validateId(id) {
  if (!id) return false;
  var reg = new RegExp(/^[a-z0-9]+$/i);
  return reg.test(id);
}

module.exports = {
  validateId,
};
