import {
  type HydratedDocument,
  type Model,
  type ObjectId,
  Schema,
  model
} from 'mongoose';

interface WorkoutSessionExercise {
  exerciseId: ObjectId;
  sets: [
    {
      reps: number;
      weight: number;
    }
  ];
}

export interface WorkoutSession {
  workoutPlanId: ObjectId;
  startedAt: Date;
  finishedAt: Date;
  exercises: WorkoutSessionExercise[];
}

type WorkoutSessionModel = Model<WorkoutSession>;

export type WorkoutSessionDocument = HydratedDocument<WorkoutSession>;

// export type PopulatedWorkoutSessionDocument = HydratedDocument<
//   MergeType<WorkoutSession, { exercises: WorkoutPlanDocument }>
// >;

const workoutSessionExerciseSchema = new Schema<WorkoutSessionExercise>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: [
      {
        reps: {
          type: Number,
          required: true
        },
        weight: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    _id: false
  }
);

const workoutSessionSchema = new Schema<WorkoutSession, WorkoutSessionModel>(
  {
    workoutPlanId: {
      type: Schema.Types.ObjectId,
      ref: 'WorkoutPlan',
      required: true
    },
    startedAt: {
      type: Date,
      required: true
    },
    finishedAt: {
      type: Date,
      required: true
    },
    exercises: [workoutSessionExerciseSchema]
  },
  {
    timestamps: true
  }
);

export const WorkoutSessionModel: WorkoutSessionModel = model<
  WorkoutSession,
  WorkoutSessionModel
>('WorkoutSession', workoutSessionSchema);
