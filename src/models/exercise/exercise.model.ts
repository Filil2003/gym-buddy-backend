import {
  type HydratedDocument,
  type Model,
  type ObjectId,
  Schema,
  model
} from 'mongoose';

export interface Exercise {
  name: string;
  description: string;
  imageFileName: string;
  note: string;
  userId: ObjectId;
}

type ExerciseModel = Model<Exercise>;

export type ExerciseDocument = HydratedDocument<Exercise>;

const exerciseSchema = new Schema<Exercise, ExerciseModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    imageFileName: String,
    note: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Add a composite primary key
exerciseSchema.index({ name: 1, userId: 1 }, { unique: true });

export const ExerciseModel = model<Exercise, ExerciseModel>('Exercise', exerciseSchema);
