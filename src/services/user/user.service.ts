import type { MongoError } from 'mongodb';
import { type User, type UserDocument, UserModel } from '#models/user/index.js';
import { to } from '#shared/utils/to.js';
import { UserAlreadyExistsError, UserNotFoundError } from './errors.js';

export const userService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  findUser,
  createUser,
  updateUser,
  deleteUser
};

async function getAllUsers(): Promise<UserDocument[]> {
  return UserModel.find();
}

async function getUserById(id: string): Promise<UserDocument | never> {
  const [error, user] = await to<UserDocument | null>(() =>
    UserModel.findById(id)
  );

  if (error) throw error;

  if (!user) throw new UserNotFoundError();

  return user;
}

async function getUserByEmail(email: string): Promise<UserDocument | never> {
  const [error, user] = await to<UserDocument | null>(() =>
    UserModel.findOne({ email })
  );

  if (error) throw error;

  if (!user) throw new UserNotFoundError();

  return user;
}

async function findUser(query: Partial<User>): Promise<UserDocument | never> {
  const [error, user] = await to<UserDocument | null>(() =>
    UserModel.findOne(query)
  );

  if (error) throw error;

  if (!user) throw new UserNotFoundError();

  return user;
}

async function createUser(
  email: string,
  password: string
): Promise<UserDocument | never> {
  const [error, newUser] = await to<UserDocument, MongoError>(() =>
    UserModel.create({ email, password })
  );

  if (error) {
    switch (error.code) {
      case 11000:
        throw new UserAlreadyExistsError(
          `User with email ${email} already exists`,
          error
        );
      default:
        throw error;
    }
  }

  return newUser;
}

async function updateUser(
  id: string,
  updatedFields: Partial<User>
): Promise<UserDocument | never> {
  const [error, updatedUser] = await to<UserDocument | null>(() =>
    UserModel.findByIdAndUpdate(id, updatedFields, { new: true })
  );

  if (error) throw error;

  if (!updatedUser) throw new UserNotFoundError();

  return updatedUser;
}

async function deleteUser(id: string): Promise<void> {
  const [error, deletedUser] = await to<UserDocument | null>(() =>
    UserModel.findByIdAndDelete(id)
  );

  if (error) throw error;

  if (!deletedUser) throw new UserNotFoundError();
}
