import type { ObjectId } from 'mongoose';
import { ExerciseDto } from '#models/exercise/index.js';
import type { PopulatedWorkoutPlanDocument } from './workout-plan.model.js';

/**
 * Data Transfer Object (DTO) for WorkoutPlan.
 */
export class WorkoutPlanDto {
  public readonly id: string;
  public readonly userId: ObjectId;
  public readonly name: string;
  public readonly exercises: ExerciseDto[];

  constructor({ id, userId, name, exercises }: PopulatedWorkoutPlanDocument) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.exercises = exercises.map(ExerciseDto.fromModel);

    Object.freeze(this); // Prevents mutation of the WorkoutPlanDto instance
  }

  /**
   * Creates a {@link WorkoutPlanDto} instance from a {@link PopulatedWorkoutPlanDocument}.
   */
  static fromModel(workoutPlan: PopulatedWorkoutPlanDocument): WorkoutPlanDto {
    return new WorkoutPlanDto(workoutPlan);
  }
}
