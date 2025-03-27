const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, errors: err });
};

module.exports = globalErrorHandler;
