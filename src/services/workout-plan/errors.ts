import { NotFoundError } from '#shared/errors/index.js';

export class WorkoutPlanNotFoundError extends NotFoundError {
  constructor(message = 'Workout plan not found', cause?: Error) {
    super(message, cause);
  }
}
