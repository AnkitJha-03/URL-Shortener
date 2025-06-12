export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.log("error : ", err);

  res.status(status).json({
    name: err.name,
    message,
    statusCode: status,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export class ApiError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message, 400, true);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401, true);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(message, 403, true);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(message, 404, true);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(message, 409, true);
  }
}
