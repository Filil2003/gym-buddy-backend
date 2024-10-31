import {
  type WorkoutPlan,
  type WorkoutPlanDocument,
  WorkoutPlanModel
} from '#models/workout-plan/index.js';
import { to } from '#shared/utils/to.js';
import { WorkoutPlanNotFoundError } from './errors.js';

export const workoutPlanService = {
  getAllWorkoutPlansByUserId,
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan
};

async function getAllWorkoutPlansByUserId(
  userId: string,
  populateFields: string[] = []
): Promise<WorkoutPlanDocument[]> {
  return WorkoutPlanModel.find({ userId }).populate(populateFields);
}

async function getWorkoutPlanById(
  userId: string,
  workoutPlanId: string,
  populateFields: string[] = []
): Promise<WorkoutPlanDocument | never> {
  const [error, workoutPlan] = await to<WorkoutPlanDocument | null>(() =>
    WorkoutPlanModel.findOne({
      _id: workoutPlanId,
      userId
    }).populate(populateFields)
  );

  if (error) throw error;

  if (!workoutPlan) throw new WorkoutPlanNotFoundError();

  return workoutPlan;
}

async function createWorkoutPlan(
  userId: string,
  workoutPlanData: Partial<Omit<WorkoutPlan, 'userId'>>,
  populateFields: string[] = []
): Promise<WorkoutPlanDocument | never> {
  const [error, newWorkoutPlan] = await to<WorkoutPlanDocument>(() =>
    WorkoutPlanModel.create({ ...workoutPlanData, userId })
  );

  if (error) throw error;

  return newWorkoutPlan.populate(populateFields);
}

async function updateWorkoutPlan(
  userId: string,
  workoutPlanId: string,
  updatedFields: Partial<Omit<WorkoutPlan, 'userId'>>,
  populateFields: string[] = []
): Promise<WorkoutPlanDocument | never> {
  const [error, updatedWorkoutPlan] = await to<WorkoutPlanDocument | null>(() =>
    WorkoutPlanModel.findOneAndUpdate(
      { _id: workoutPlanId, userId },
      updatedFields,
      { new: true }
    ).populate(populateFields)
  );

  if (error) throw error;

  if (!updatedWorkoutPlan) throw new WorkoutPlanNotFoundError();

  return updatedWorkoutPlan;
}

async function deleteWorkoutPlan(
  userId: string,
  workoutPlanId: string
): Promise<void> {
  const [error, deletedWorkoutPlan] = await to<WorkoutPlanDocument | null>(() =>
    WorkoutPlanModel.findOneAndDelete({ _id: workoutPlanId, userId })
  );

  if (error) throw error;

  if (!deletedWorkoutPlan) throw new WorkoutPlanNotFoundError();
}
