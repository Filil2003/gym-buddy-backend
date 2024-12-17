import type { WorkoutSessionDocument } from './workout-session.model.js';

interface WorkoutSetDto {
  reps: number;
  weight: number;
}

interface WorkoutExerciseDto {
  name: string;
  sets: WorkoutSetDto[];
}

/**
 * Data Transfer Object (DTO) for WorkoutSession.
 */
export class WorkoutSessionDto {
  public readonly id: string;
  public readonly userId: string;
  public readonly planTittle: string;
  public readonly startedAt: Date;
  public readonly finishedAt: Date;
  public readonly exercises: WorkoutExerciseDto[];

  constructor({
    id,
    userId,
    workoutPlanTittle,
    startedAt,
    finishedAt,
    exercises
  }: WorkoutSessionDocument) {
    this.id = id;
    this.userId = userId.toString();
    this.planTittle = workoutPlanTittle;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.exercises = exercises.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets.map((set) => ({
        reps: set.reps,
        weight: set.weight
      }))
    }));

    Object.freeze(this); // Prevents mutation of the WorkoutSessionDto instance
  }

  /**
   * Creates a {@link WorkoutSessionDto} instance from a {@link WorkoutSessionDocument}.
   */
  static fromDocument(
    workoutSession: WorkoutSessionDocument
  ): WorkoutSessionDto {
    return new WorkoutSessionDto(workoutSession);
  }
}
