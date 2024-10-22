import type { UserDocument } from './user.model.js';

/**
 * Data Transfer Object (DTO) for User.
 */
export class UserDto {
  public readonly id: string;
  public readonly email: string;

  constructor({ id, email }: UserDocument) {
    this.id = id;
    this.email = email;

    Object.freeze(this); // Prevents mutation of the UserDto instance
  }

  /**
   * Creates a {@link UserDto} instance from a {@link UserDocument}.
   */
  static fromModel(user: UserDocument): UserDto {
    return new UserDto(user);
  }
}
