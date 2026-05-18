
export const errorHandler = (err, req, res, next) => {
  // Log the full error stack trace for debugging
  console.error(err.stack);

  const response = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };

  // Differentiate between operational errors and programmer errors by status code
  const statusCode = err.statusCode && err.statusCode >= 400 && err.statusCode < 600
    ? err.statusCode
    : 500;

  // If headers already sent, delegate to Express default error handler
  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json(response);
};
