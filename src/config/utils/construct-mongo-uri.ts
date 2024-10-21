import type { MongoConfig } from '../types/types.js';

/**
 * Constructs the MongoDB connection string.
 * @param mongoConfig An object containing the MongoDB configuration.
 * @returns The MongoDB connection string.
 *
 * @example
 * const mongoConfig = {
 *   host: 'localhost',
 *   port: '27017',
 *   database: 'mydb',
 *   username: 'user',
 *   password: 'password',
 *   options: 'authSource=admin'
 * };
 * const connectionString = getDatabaseUri(mongoConfig);
 * console.log(connectionString); // mongodb://user:password@localhost:27017/mydb?authSource=admin
 */
export function constructMongoUri(mongoConfig: MongoConfig): string {
  const url: URL = new URL(
    `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`
  );

  if (mongoConfig.username && mongoConfig.password) {
    url.username = mongoConfig.username;
    url.password = mongoConfig.password;
  }

  if (mongoConfig.options) url.search = mongoConfig.options;

  return url.toString();
}
