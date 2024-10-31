import { HttpStatusCode, HttpStatusMessage } from '#shared/http/enums/index.js';
import { HttpError } from './http.error.js';

export class InternalServerError extends HttpError {
  constructor(
    message: string = HttpStatusMessage.InternalServerError,
    cause?: Error
  ) {
    super(message, HttpStatusCode.InternalServerError, cause);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = HttpStatusMessage.NotFound, cause?: Error) {
    super(message, HttpStatusCode.NotFound, cause);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = HttpStatusMessage.Conflict, cause?: Error) {
    super(message, HttpStatusCode.Conflict, cause);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = HttpStatusMessage.BadRequest, cause?: Error) {
    super(message, HttpStatusCode.BadRequest, cause);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = HttpStatusMessage.Unauthorized, cause?: Error) {
    super(message, HttpStatusCode.Unauthorized, cause);
  }
}
