import type { ObjectId } from 'mongoose';
import type { WorkoutSessionDocument } from './workout-session.model.js';

/**
 * Data Transfer Object (DTO) for WorkoutSession.
 */
export class WorkoutSessionDto {
  public readonly id: string;
  public readonly workoutPlanId: string;
  public readonly startedAt: Date;
  public readonly finishedAt: Date;
  public readonly exercises: {
    exerciseId: ObjectId;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];

  constructor({
    id,
    workoutPlanId,
    startedAt,
    finishedAt,
    exercises
  }: WorkoutSessionDocument) {
    this.id = id;
    this.workoutPlanId = workoutPlanId.toString();
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.exercises = exercises;

    Object.freeze(this); // Prevents mutation of the WorkoutSessionDto instance
  }

  /**
   * Creates a {@link WorkoutSessionDto} instance from a {@link WorkoutSessionDocument}.
   */
  static fromModel(workoutSession: WorkoutSessionDocument): WorkoutSessionDto {
    return new WorkoutSessionDto(workoutSession);
  }
}
