
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const response = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };

  const statusCode = err.statusCode && err.statusCode >= 400 && err.statusCode < 600
    ? err.statusCode
    : 500;

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json(response);
};
