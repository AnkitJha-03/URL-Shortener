export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    name: err.name,
    message,
    statusCode: status,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400, true);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, true);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, true);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404, true);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, true);
  }
}