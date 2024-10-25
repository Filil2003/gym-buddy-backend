import type { ObjectId } from 'mongoose';
import type { ExerciseDocument } from './exercise.model.js';

/**
 * Data Transfer Object (DTO) for Exercise.
 */
export class ExerciseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly imageFileName: string;
  public readonly note: string;
  public readonly userId: ObjectId;

  constructor({
    id,
    name,
    description,
    imageFileName,
    note,
    userId
  }: ExerciseDocument) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageFileName = imageFileName;
    this.note = note;
    this.userId = userId;

    Object.freeze(this); // Prevents mutation of the ExerciseDto instance
  }

  /**
   * Creates a {@link ExerciseDto} instance from a {@link ExerciseDocument}.
   */
  static fromModel(exercise: ExerciseDocument): ExerciseDto {
    return new ExerciseDto(exercise);
  }
}
