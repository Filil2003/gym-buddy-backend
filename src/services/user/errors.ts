import { ConflictError, NotFoundError } from '@shared/errors/index.js';

export class UserNotFoundError extends NotFoundError {}

export class UserAlreadyExistsError extends ConflictError {}
