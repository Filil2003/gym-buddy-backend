import { HttpStatusCode, HttpStatusMessage } from '@shared/http/enums/index.js';
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
