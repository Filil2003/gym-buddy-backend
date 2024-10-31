import {
  type HydratedDocument,
  type Model,
  type ObjectId,
  Schema,
  model
} from 'mongoose';
import type { ExerciseDocument } from '#models/exercise/index.js';

export interface WorkoutPlan {
  userId: ObjectId;
  name: string;
  exercises: (ObjectId | ExerciseDocument)[];
}

type WorkoutPlanModel = Model<WorkoutPlan>;

export type WorkoutPlanDocument = HydratedDocument<WorkoutPlan>;

const workoutPlanSchema = new Schema<WorkoutPlan, WorkoutPlanModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: true,
      trim: true
    },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
  },
  { timestamps: true }
);

// Add a composite index
workoutPlanSchema.index({ name: 1, userId: 1 }, { unique: true });

export const WorkoutPlanModel: WorkoutPlanModel = model<
  WorkoutPlan,
  WorkoutPlanModel
>('WorkoutPlan', workoutPlanSchema);
