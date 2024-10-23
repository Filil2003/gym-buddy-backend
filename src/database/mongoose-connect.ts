import mongoose from 'mongoose';
import { config } from '#config/index.js';
import { cliLoggerService } from '#services/logger/index.js';
import { to } from '#shared/utils/to.js';
import { MongoDbError } from './errors.js';

if (config.isDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    cliLoggerService.info(
      `Mongoose: ${collectionName}.${method}(${JSON.stringify(query)}), ${JSON.stringify(doc)}`
    );
  });
}

export async function mongooseConnect(): Promise<void> {
  cliLoggerService.info('Connecting to MongoDB...');

  const [error, connection] = await to(mongoose.connect(config.mongo.uri));

  if (error) {
    cliLoggerService.error(error.message);
    throw new MongoDbError('Failed to connect to MongoDB', error);
  }

  cliLoggerService.info(
    `MongoDB connected to ${connection.connection.host}:${connection.connection.port}`
  );
  cliLoggerService.info(`MongoDB version: ${connection.version}`);
  cliLoggerService.info(`MongoDB name: ${connection.connection.name}`);
}
