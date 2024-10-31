import type { ExerciseDocument } from './exercise.model.js';

/**
 * Data Transfer Object (DTO) for Exercise.
 */
export class ExerciseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly imageFileName?: string;
  public readonly note?: string;

  constructor({
    id,
    name,
    description,
    imageFileName,
    note
  }: ExerciseDocument) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageFileName = imageFileName;
    this.note = note;

    Object.freeze(this); // Prevents mutation of the ExerciseDto instance
  }

  /**
   * Creates a {@link ExerciseDto} instance from a {@link ExerciseDocument}.
   */
  static fromDocument(exercise: ExerciseDocument): ExerciseDto {
    return new ExerciseDto(exercise);
  }
}
