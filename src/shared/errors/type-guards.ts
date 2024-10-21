import { HttpError } from '@shared/errors/http.error.js';

export function isHttpError(value: unknown): value is HttpError {
  return value instanceof HttpError;
}
