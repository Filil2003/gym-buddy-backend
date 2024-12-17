import {
  type HydratedDocument,
  type Model,
  type ObjectId,
  Schema,
  model
} from 'mongoose';

interface WorkoutSet {
  reps: number;
  weight: number;
}

interface WorkoutExercise {
  name: string;
  description?: string;
  imageFileName?: string;
  note?: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  userId: ObjectId;
  workoutPlanTittle: string;
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
  name: { type: String, required: true },
  description: { type: String },
  imageFileName: { type: String },
  note: { type: String },
  sets: [workoutSetSchema]
});

const workoutSessionSchema = new Schema<WorkoutSession, WorkoutSessionModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workoutPlanTittle: { type: 'string', required: true },
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
