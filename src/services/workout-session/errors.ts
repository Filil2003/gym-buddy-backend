import { NotFoundError } from '#shared/errors/index.js';

export class WorkoutSessionNotFoundError extends NotFoundError {
  constructor(message = 'Workout session not found', cause?: Error) {
    super(message, cause);
  }
}
