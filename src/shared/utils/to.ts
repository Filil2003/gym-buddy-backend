/**
 * Utility function to handle both synchronous values and asynchronous Promises,
 * returning a result in a tuple format commonly used in Go-style error handling,
 * where the first element is an error (if any) and the second is the result.
 *
 * @param expression - Either a synchronous value or a Promise.
 * @returns A Promise that resolves to a tuple: `[error, result]`, where `error` is
 * `null` if there is no error, and `result` is `null` if an error occurs.
 *
 * @example
 * // Using to() with a synchronous operation that throws an error:
 * async function throwErrorExample() {
 *   const [error, result] = await to(() => {
 *     throw new Error("Something went wrong!");
 *   });
 *   if (error) {
 *     console.error("Caught error:", error.message); // Output: Caught error: Something went wrong!
 *   } else {
 *     console.log("Result:", result);
 *   }
 * }
 *
 * @example
 * // Using to() with an asynchronous operation:
 * async function fetchDataExample() {
 *   const [error, result] = await to(() => fetch("https://api.example.com/data"));
 *   if (error) {
 *     console.error("Fetch error:", error);
 *   } else {
 *     const data = await result.json(); // Await for the response to be parsed
 *     console.log("Data fetched:", data);
 *   }
 * }
 */
export function to<T, E = Error>(
  expression: () => T | Promise<T>
): Promise<[null, T] | [E, null]> {
  return Promise.resolve()
    .then(() => typeof expression === 'function' ? expression() : expression)
    .then<[null, T]>((data: T) => [null, data])
    .catch<[E, null]>((error: E) => [error, null]);
}
