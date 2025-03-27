const globalErrorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ success: false, errors: { common: { msg: err.message } } });
};

module.exports = globalErrorHandler;
