import {
  type HydratedDocument,
  type Model,
  type ObjectId,
  Schema,
  model
} from 'mongoose';
import type { ExerciseDocument } from '#models/exercise/index.js';

interface WorkoutSet {
  reps: number;
  weight: number;
}

interface WorkoutExercise {
  exercise: ObjectId | ExerciseDocument;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  userId: ObjectId;
  workoutPlanId: ObjectId;
  startedAt: Date;
  finishedAt: Date;
  exercises: WorkoutExercise[];
}

type WorkoutSessionModel = Model<WorkoutSession>;

export type WorkoutSessionDocument = HydratedDocument<WorkoutSession>;

const workoutSetSchema = new Schema<WorkoutSet>({
  reps: { type: Number, required: true, min: 0 },
  weight: { type: Number, required: true, min: 0 }
});

const workoutExerciseSchema = new Schema<WorkoutExercise>({
  exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: [workoutSetSchema]
});

const workoutSessionSchema = new Schema<WorkoutSession, WorkoutSessionModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workoutPlanId: {
      type: Schema.Types.ObjectId,
      ref: 'WorkoutPlan',
      required: true
    },
    startedAt: { type: Date, required: true },
    finishedAt: { type: Date, required: true },
    exercises: [workoutExerciseSchema]
  },
  { timestamps: true }
);

export const WorkoutSessionModel: WorkoutSessionModel = model<
  WorkoutSession,
  WorkoutSessionModel
>('WorkoutSession', workoutSessionSchema);
