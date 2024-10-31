import {
  type WorkoutSession,
  type WorkoutSessionDocument,
  WorkoutSessionModel
} from '#models/workout-session/index.js';
import { to } from '#shared/utils/to.js';
import { WorkoutSessionNotFoundError } from './errors.js';

export const workoutSessionService = {
  getAllWorkoutSessionsByWorkoutPlanId,
  getWorkoutSessionById,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession
};

async function getAllWorkoutSessionsByWorkoutPlanId(
  workoutPlanId: string,
  populateFields: string[] = []
): Promise<WorkoutSessionDocument[]> {
  return WorkoutSessionModel.find({
    workoutPlanId
  }).populate(populateFields);
}

async function getWorkoutSessionById(
  workoutSessionId: string,
  populateFields: string[] = []
): Promise<WorkoutSessionDocument | never> {
  const [error, workoutSession] = await to<WorkoutSessionDocument | null>(() =>
    WorkoutSessionModel.findById(workoutSessionId).populate(populateFields)
  );

  if (error) throw error;

  if (!workoutSession) throw new WorkoutSessionNotFoundError();

  return workoutSession;
}

async function createWorkoutSession(
  documentData: WorkoutSession,
  populateFields: string[] = []
): Promise<WorkoutSessionDocument | never> {
  const [error, newWorkoutSession] = await to<WorkoutSessionDocument>(() =>
    WorkoutSessionModel.create(documentData)
  );

  if (error) throw error;

  return newWorkoutSession.populate(populateFields);
}

async function updateWorkoutSession(
  workoutSessionId: string,
  updatedFields: Partial<Omit<WorkoutSession, 'workoutPlanId'>>,
  populateFields: string[] = []
): Promise<WorkoutSessionDocument | never> {
  const [error, updatedWorkoutSession] =
    await to<WorkoutSessionDocument | null>(() =>
      WorkoutSessionModel.findByIdAndUpdate(workoutSessionId, updatedFields, {
        new: true
      }).populate(populateFields)
    );

  if (error) throw error;

  if (!updatedWorkoutSession) throw new WorkoutSessionNotFoundError();

  return updatedWorkoutSession;
}

async function deleteWorkoutSession(workoutSessionId: string): Promise<void> {
  const [error, deletedWorkoutSession] =
    await to<WorkoutSessionDocument | null>(() =>
      WorkoutSessionModel.findByIdAndDelete(workoutSessionId)
    );

  if (error) throw error;

  if (!deletedWorkoutSession) throw new WorkoutSessionNotFoundError();
}
