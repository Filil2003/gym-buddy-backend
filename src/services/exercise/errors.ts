import { NotFoundError } from '#shared/errors/index.js';

export class ExerciseNotFoundError extends NotFoundError {
  constructor(message = 'Exercise not found', cause?: Error) {
    super(message, cause);
  }
}
