import type { ObjectId } from 'mongoose';
import {
  ExerciseDto,
  isExerciseDocument
} from '#models/exercise/index.js';
import type { WorkoutPlanDocument } from './workout-plan.model.js';

/**
 * Data Transfer Object (DTO) for WorkoutPlan.
 */
export class WorkoutPlanDto {
  public readonly id: string;
  public readonly userId: string;
  public readonly name: string;
  public readonly exercises: (ObjectId | ExerciseDto)[];

  constructor({ id, userId, name, exercises }: WorkoutPlanDocument) {
    this.id = id;
    this.userId = userId.toString();
    this.name = name;

    this.exercises = exercises.map((exercise) =>
      isExerciseDocument(exercise) ? ExerciseDto.fromDocument(exercise) : exercise
    );

    Object.freeze(this); // Prevents mutation of the WorkoutPlanDto instance
  }

  /**
   * Creates a {@link WorkoutPlanDto} instance from a {@link WorkoutPlanDocument}.
   */
  static fromDocument(workoutPlan: WorkoutPlanDocument): WorkoutPlanDto {
    return new WorkoutPlanDto(workoutPlan);
  }
}
