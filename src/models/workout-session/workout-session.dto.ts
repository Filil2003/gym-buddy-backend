import { ExerciseDto, isExerciseDocument } from '#models/exercise/index.js';
import type { WorkoutSessionDocument } from './workout-session.model.js';

interface WorkoutSetDto {
  reps: number;
  weight: number;
}

interface WorkoutExerciseDto {
  id: string;
  name?: string;
  description?: string;
  imageFileName?: string;
  note?: string;
  sets: WorkoutSetDto[];
}

/**
 * Data Transfer Object (DTO) for WorkoutSession.
 */
export class WorkoutSessionDto {
  public readonly id: string;
  public readonly userId: string;
  public readonly workoutPlanId: string;
  public readonly startedAt: Date;
  public readonly finishedAt: Date;
  public readonly exercises: WorkoutExerciseDto[];

  constructor({
    id,
    userId,
    workoutPlanId,
    startedAt,
    finishedAt,
    exercises
  }: WorkoutSessionDocument) {
    this.id = id;
    this.userId = userId.toString();
    this.workoutPlanId = workoutPlanId.toString();
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;

    this.exercises = exercises.map(({ exercise, sets }) =>
      isExerciseDocument(exercise)
        ? {
            ...ExerciseDto.fromDocument(exercise),
            sets: sets.map(
              ({ reps, weight }): WorkoutSetDto => ({ reps, weight })
            )
          }
        : {
            id: exercise.toString(),
            sets: sets.map(
              ({ reps, weight }): WorkoutSetDto => ({ reps, weight })
            )
          }
    );

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
