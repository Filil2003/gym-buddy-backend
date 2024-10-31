import bcrypt from 'bcrypt';
import {
  type CallbackWithoutResultAndOptionalError,
  type HydratedDocument,
  type Model,
  Schema,
  model
} from 'mongoose';

export interface User {
  email: string;
  password: string;
}

interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<User, Record<string, never>, UserMethods>;

export type UserDocument = HydratedDocument<User, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.method(
  'comparePassword',
  async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
);

userSchema.pre(
  'save',
  async function hashPassword(
    next: CallbackWithoutResultAndOptionalError
  ): Promise<void> {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  }
);

export const UserModel: UserModel = model<User, UserModel>('User', userSchema);
