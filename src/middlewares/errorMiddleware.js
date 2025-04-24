
// Development error response
const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Production error response
const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

// Global error handling middleware
export const globalError = (err, req, res, next) => {
  //  default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};
