import type { ExerciseDocument } from '#models/exercise/index.js';
import {
  type PopulatedWorkoutPlanDocument,
  type WorkoutPlan,
  type WorkoutPlanDocument,
  WorkoutPlanDto,
  WorkoutPlanModel
} from '#models/workout-plan/index.js';
import { to } from '#shared/utils/to.js';
import { WorkoutPlanNotFoundError } from './errors.js';

export const workoutPlanService = {
  getAllWorkoutPlansByUser,
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan
};

async function getAllWorkoutPlansByUser(
  userId: string
): Promise<WorkoutPlanDto[]> {
  const workoutPlans: PopulatedWorkoutPlanDocument[] =
    await WorkoutPlanModel.find({ userId }).populate<{
      exercises: ExerciseDocument[];
    }>('exercises');

  return workoutPlans.map(WorkoutPlanDto.fromModel);
}

async function getWorkoutPlanById(
  userId: string,
  workoutPlanId: string
): Promise<WorkoutPlanDto | never> {
  const [error, workoutPlan] = await to<PopulatedWorkoutPlanDocument | null>(
    WorkoutPlanModel.findOne({
      _id: workoutPlanId,
      userId
    }).populate<{ exercises: ExerciseDocument[] }>('exercises')
  );

  if (error) throw error;

  if (!workoutPlan)
    throw new WorkoutPlanNotFoundError('Workout plan not found');

  return WorkoutPlanDto.fromModel(workoutPlan);
}

async function createWorkoutPlan(
  userId: string,
  workoutPlanData: Partial<Omit<WorkoutPlan, 'userId'>>
): Promise<WorkoutPlanDto | never> {
  const [error, newWorkoutPlan] = await to<WorkoutPlanDocument>(
    WorkoutPlanModel.create({ ...workoutPlanData, userId })
  );

  if (error) throw error;

  await newWorkoutPlan.populate<{ exercises: ExerciseDocument[] }>('exercises');

  return WorkoutPlanDto.fromModel(
    newWorkoutPlan as PopulatedWorkoutPlanDocument
  );
}

async function updateWorkoutPlan(
  userId: string,
  workoutPlanId: string,
  updatedFields: Partial<Omit<WorkoutPlan, 'userId'>>
): Promise<WorkoutPlanDto | never> {
  const [error, updatedWorkoutPlan] =
    await to<PopulatedWorkoutPlanDocument | null>(
      WorkoutPlanModel.findOneAndUpdate(
        { _id: workoutPlanId, userId },
        updatedFields,
        { new: true }
      ).populate<{ exercises: ExerciseDocument[] }>('exercises')
    );

  if (error) throw error;

  if (!updatedWorkoutPlan)
    throw new WorkoutPlanNotFoundError('Workout plan not found');

  return WorkoutPlanDto.fromModel(updatedWorkoutPlan);
}

async function deleteWorkoutPlan(
  userId: string,
  workoutPlanId: string
): Promise<void> {
  const [error, deletedWorkoutPlan] = await to<WorkoutPlanDocument | null>(
    WorkoutPlanModel.findOneAndDelete({ _id: workoutPlanId, userId })
  );

  if (error) throw error;

  if (!deletedWorkoutPlan)
    throw new WorkoutPlanNotFoundError('Workout plan not found');
}
