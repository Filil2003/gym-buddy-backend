import {
  type Exercise,
  type ExerciseDocument,
  ExerciseModel
} from '#models/exercise/index.js';
import { ExerciseNotFoundError } from '#services/exercise/errors.js';
import { to } from '#shared/utils/to.js';

export const exerciseService = {
  getAllExercisesByUserId,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};

async function getAllExercisesByUserId(
  userId: string
): Promise<ExerciseDocument[]> {
  return ExerciseModel.find({ userId });
}

async function getExerciseById(
  userId: string,
  exerciseId: string
): Promise<ExerciseDocument | never> {
  const [error, exercise] = await to<ExerciseDocument | null>(() =>
    ExerciseModel.findOne({
      _id: exerciseId,
      userId
    })
  );

  if (error) throw error;

  if (!exercise) throw new ExerciseNotFoundError();

  return exercise;
}

async function createExercise(
  userId: string,
  exerciseData: Partial<Omit<Exercise, 'userId'>>
): Promise<ExerciseDocument | never> {
  const [error, newExercise] = await to<ExerciseDocument>(() =>
    ExerciseModel.create({ ...exerciseData, userId })
  );

  if (error) throw error;

  return newExercise;
}

async function updateExercise(
  userId: string,
  exerciseId: string,
  updatedFields: Partial<Omit<Exercise, 'userId'>>
): Promise<ExerciseDocument | never> {
  const [error, updatedExercise] = await to<ExerciseDocument | null>(() =>
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

  if (!updatedExercise) throw new ExerciseNotFoundError();

  return updatedExercise;
}

async function deleteExercise(
  userId: string,
  exerciseId: string
): Promise<void> {
  const [error, deletedExercise] = await to<ExerciseDocument | null>(() =>
    ExerciseModel.findOneAndDelete({
      _id: exerciseId,
      userId
    })
  );

  if (error) throw error;

  if (!deletedExercise) throw new ExerciseNotFoundError();
}
