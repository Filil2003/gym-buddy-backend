/**
 * A utility function to handle Promises, returning a consistent result format
 * in the style of Go, where a function returns both an error and a result.
 *
 * @param promise - The Promise to handle.
 * @returns A Promise that resolves to a tuple: [error, result].
 *
 * @example
 * // Example usage with a standard API request
 * async function exampleUsage() {
 *   const [error, result] = await to(fetch("https://api.example.com/data"));
 *
 *   if (error) {
 *     console.error("An error occurred:", error);
 *   } else {
 *     console.log("Fetched data:", result);
 *   }
 * }
 *
 * @example
 * // Example usage with a custom error for user creation
 * async function createUserExample() {
 *   const [error, result] = await to<User, UserAlreadyExistsError>(createUser("john_doe"));
 *
 *   if (error) {
 *     if (error instanceof UserAlreadyExistsError) {
 *       console.error("Registration failed:", error.message);
 *     } else {
 *       console.error("An unexpected error occurred:", error);
 *     }
 *   } else {
 *     console.log("User created successfully:", result);
 *   }
 * }
 */
export function to<T, E = Error>(
  promise: Promise<T>
): Promise<[null, T] | [E, null]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[E, null]>((error: E) => [error, null]);
}
