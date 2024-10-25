import {
  type HydratedDocument,
  type MergeType,
  type Model,
  type ObjectId,
  Schema,
  model
} from 'mongoose';
import type { ExerciseDocument } from '#models/exercise/index.js';

export interface WorkoutPlan {
  name: string;
  exercises: ObjectId[];
  userId: ObjectId;
}

type WorkoutPlanModel = Model<WorkoutPlan>;

export type WorkoutPlanDocument = HydratedDocument<WorkoutPlan>;

export type PopulatedWorkoutPlanDocument = HydratedDocument<
  MergeType<WorkoutPlan, { exercises: ExerciseDocument[] }>
>;

const workoutPlanSchema = new Schema<WorkoutPlan, WorkoutPlanModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Add a composite primary key
workoutPlanSchema.index({ name: 1, userId: 1 }, { unique: true });

export const WorkoutPlanModel = model<WorkoutPlan, WorkoutPlanModel>(
  'WorkoutPlan',
  workoutPlanSchema
);
