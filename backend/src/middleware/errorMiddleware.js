
export const notFound = (req, res, next) => {
  const error = new Error(
    `Route not found: ${req.originalUrl}`
  );

  res.status(404);

  next(error);
};

export const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(
    "Global Error:",
    error.message
  );
  let statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;

  if (
    error.name ===
    "ValidationError"
  ) {
    statusCode = 400;
  }
  if (
    error.name ===
    "CastError"
  ) {
    statusCode = 400;
  }

  if (
    error.code === 11000
  ) {
    statusCode = 409;
  }

  res.status(statusCode).json({
    success: false,

    message:
      error.message ||
      "Internal server error",

    ...(process.env.NODE_ENV ===
      "development" && {
      stack: error.stack,
    }),
  });
};