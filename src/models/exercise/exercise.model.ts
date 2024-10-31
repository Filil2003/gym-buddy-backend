import {
  type HydratedDocument,
  type Model,
  type ObjectId,
  Schema,
  model
} from 'mongoose';

export interface Exercise {
  userId: ObjectId;
  name: string;
  description?: string;
  imageFileName?: string;
  note?: string;
}

type ExerciseModel = Model<Exercise>;

export type ExerciseDocument = HydratedDocument<Exercise>;

const exerciseSchema = new Schema<Exercise, ExerciseModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    imageFileName: String,
    note: String
  },
  { timestamps: true }
);

// Add a composite index
exerciseSchema.index({ name: 1, userId: 1 }, { unique: true });

export const ExerciseModel: ExerciseModel = model<Exercise, ExerciseModel>(
  'Exercise',
  exerciseSchema
);
