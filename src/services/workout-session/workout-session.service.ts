import { WorkoutSessionDto } from '#models/workout-session/workout-session.dto.js';
import {
  type WorkoutSession,
  type WorkoutSessionDocument,
  WorkoutSessionModel
} from '#models/workout-session/workout-session.model.js';
import { to } from '#shared/utils/to.js';
import { WorkoutSessionNotFoundError } from './errors.js';

export const workoutSessionService = {
  getAllWorkoutSessionsByWorkoutPlan,
  getWorkoutSessionById,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession
};

async function getAllWorkoutSessionsByWorkoutPlan(
  workoutPlanId: string
): Promise<WorkoutSessionDto[]> {
  const workoutSessions: WorkoutSessionDocument[] =
    await WorkoutSessionModel.find({
      workoutPlanId
    });

  return workoutSessions.map(WorkoutSessionDto.fromModel);
}

async function getWorkoutSessionById(
  workoutSessionId: string
): Promise<WorkoutSessionDto | never> {
  const [error, workoutSession] = await to<WorkoutSessionDocument | null>(
    WorkoutSessionModel.findById(workoutSessionId)
  );

  if (error) throw error;

  if (!workoutSession)
    throw new WorkoutSessionNotFoundError('Workout session not found');

  return WorkoutSessionDto.fromModel(workoutSession);
}

async function createWorkoutSession(
  workoutPlanId: string,
  workoutSessionData: Partial<Omit<WorkoutSession, 'workoutPlanId'>>
): Promise<WorkoutSessionDto | never> {
  const [error, newWorkoutSession] = await to<WorkoutSessionDocument>(
    WorkoutSessionModel.create({
      ...workoutSessionData,
      workoutPlanId
    })
  );

  if (error) throw error;

  return WorkoutSessionDto.fromModel(newWorkoutSession);
}

async function updateWorkoutSession(
  workoutSessionId: string,
  updatedFields: Partial<Omit<WorkoutSession, 'workoutPlanId'>>
): Promise<WorkoutSessionDto | never> {
  const [error, updatedWorkoutSession] =
    await to<WorkoutSessionDocument | null>(
      WorkoutSessionModel.findByIdAndUpdate(workoutSessionId, updatedFields, {
        new: true
      })
    );

  if (error) throw error;

  if (!updatedWorkoutSession)
    throw new WorkoutSessionNotFoundError('Workout session not found');

  return WorkoutSessionDto.fromModel(updatedWorkoutSession);
}

async function deleteWorkoutSession(workoutSessionId: string): Promise<void> {
  const [error, deletedWorkoutSession] =
    await to<WorkoutSessionDocument | null>(
      WorkoutSessionModel.findByIdAndDelete(workoutSessionId)
    );

  if (error) throw error;

  if (!deletedWorkoutSession)
    throw new WorkoutSessionNotFoundError('Workout session not found');
}
