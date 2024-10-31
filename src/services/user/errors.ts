import { ConflictError, NotFoundError } from '#shared/errors/index.js';

export class UserNotFoundError extends NotFoundError {
  constructor(message = 'User not found', cause?: Error) {
    super(message, cause);
  }
}

export class UserAlreadyExistsError extends ConflictError {}
