import {
  type User,
  type UserDocument,
  UserDto,
  UserModel
} from '@models/user/index.js';
import { to } from '@shared/utils/to.js';
import type { MongoError } from 'mongodb';
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

async function getAllUsers(): Promise<UserDto[]> {
  const users: UserDocument[] = await UserModel.find();
  return users.map(UserDto.fromModel);
}

async function getUserById(id: string): Promise<UserDto | never> {
  const [error, user] = await to<UserDocument | null>(UserModel.findById(id));

  if (error) throw error;

  if (!user) throw new UserNotFoundError(`User with id ${id} not found.`);

  return UserDto.fromModel(user);
}

async function getUserByEmail(email: string): Promise<UserDto | never> {
  const [error, user] = await to<UserDocument | null>(
    UserModel.findOne({ email })
  );

  if (error) throw error;

  if (!user) throw new UserNotFoundError(`User with email ${email} not found.`);

  return UserDto.fromModel(user);
}

async function findUser(query: Partial<User>): Promise<UserDto | never> {
  const [error, user] = await to<UserDocument | null>(UserModel.findOne(query));

  if (error) throw error;

  if (!user) throw new UserNotFoundError('User not found.');

  return UserDto.fromModel(user);
}

async function createUser(
  email: string,
  password: string
): Promise<UserDto | never> {
  const [error, newUser] = await to<UserDocument, MongoError>(
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

  return UserDto.fromModel(newUser);
}

async function updateUser(
  id: string,
  updatedFields: Partial<User>
): Promise<UserDto | never> {
  const [error, updatedUser] = await to<UserDocument | null>(
    UserModel.findByIdAndUpdate(id, updatedFields, { new: true })
  );

  if (error) throw error;

  if (!updatedUser) {
    throw new UserNotFoundError(`User with id ${id} not found.`);
  }

  return UserDto.fromModel(updatedUser);
}

async function deleteUser(id: string): Promise<void> {
  const [error, deletedUser] = await to<UserDocument | null>(
    UserModel.findByIdAndDelete(id)
  );

  if (error) throw error;

  if (!deletedUser) {
    throw new UserNotFoundError(`User with id ${id} not found.`);
  }
}
