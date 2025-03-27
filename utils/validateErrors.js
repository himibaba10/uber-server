const { validationResult } = require("express-validator");

const validateErrors = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsObj = {};
    errors.array().forEach((err) => (errorsObj[err.path] = { msg: err.msg }));
    res.status(400).json({ success: false, errors: errorsObj });
    return true;
  }

  return false;
};

module.exports = validateErrors;
