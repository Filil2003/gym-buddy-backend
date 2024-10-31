import type { ExerciseDocument } from '#models/exercise/exercise.model.js';
import { hasOwnProperties } from '#shared/objectUtils.js';

export function isExerciseDocument(value: unknown): value is ExerciseDocument {
  return hasOwnProperties<ExerciseDocument>(value, [
    'userId',
    'name',
    'description',
    'imageFileName',
    'note'
  ]);
}
