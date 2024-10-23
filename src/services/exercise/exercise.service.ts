import type { MongoError } from 'mongodb';
import {
  type Exercise,
  type ExerciseDocument,
  ExerciseDto,
  ExerciseModel
} from '#models/exercise/index.js';
import { ExerciseNotFoundError } from '#services/exercise/errors.js';
import { to } from '#shared/utils/to.js';

export const exerciseService = {
  getAllExercisesByUser,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};

async function getAllExercisesByUser(userId: string): Promise<ExerciseDto[]> {
  const exercises: ExerciseDocument[] = await ExerciseModel.find({ userId });
  return exercises.map(ExerciseDto.fromModel);
}

async function getExerciseById(
  userId: string,
  exerciseId: string
): Promise<ExerciseDto | never> {
  const [error, exercise] = await to<ExerciseDocument | null>(
    ExerciseModel.findOne({
      _id: exerciseId,
      userId
    })
  );

  if (error) throw error;

  if (!exercise) throw new ExerciseNotFoundError('Exercise not found');

  return ExerciseDto.fromModel(exercise);
}

async function createExercise(
  userId: string,
  exerciseData: Partial<Omit<Exercise, 'userId'>>
): Promise<ExerciseDto | never> {
  const [error, newExercise] = await to<ExerciseDocument, MongoError>(
    ExerciseModel.create({ ...exerciseData, userId })
  );

  if (error) throw error;

  return ExerciseDto.fromModel(newExercise);
}

async function updateExercise(
  userId: string,
  exerciseId: string,
  updatedFields: Partial<Omit<Exercise, 'userId'>>
): Promise<ExerciseDto | never> {
  const [error, updatedExercise] = await to<ExerciseDocument | null>(
    ExerciseModel.findOneAndUpdate(
      {
        _id: exerciseId,
        userId
      },
      updatedFields,
      { new: true }
    )
  );

  if (error) throw error;

  if (!updatedExercise) throw new ExerciseNotFoundError('Exercise not found');

  return ExerciseDto.fromModel(updatedExercise);
}

async function deleteExercise(
  userId: string,
  exerciseId: string
): Promise<void> {
  const [error, deletedExercise] = await to(
    ExerciseModel.findOneAndDelete({
      _id: exerciseId,
      userId
    })
  );

  if (error) throw error;

  if (!deletedExercise) throw new ExerciseNotFoundError('Exercise not found');
}
