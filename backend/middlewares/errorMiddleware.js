const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error); // here it will go to the error handler since in the server.js the notFound middleware is directly before errorHandler middleware so errorhandler middleware will hold it with err.
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
