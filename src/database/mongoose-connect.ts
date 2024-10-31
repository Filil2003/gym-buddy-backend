import mongoose, { type Mongoose } from 'mongoose';
import { config } from '#config/index.js';
import { cliLoggerService } from '#services/logger/index.js';

if (config.isDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    cliLoggerService.info(
      `Mongoose: ${collectionName}.${method}(${JSON.stringify(query)}), ${JSON.stringify(doc)}`
    );
  });
}

export async function mongooseConnect(): Promise<Mongoose> {
  cliLoggerService.info('Connecting to MongoDB...');

  const connection = await mongoose.connect(config.mongo.uri);

  cliLoggerService.info(
    `MongoDB connected to ${connection.connection.host}:${connection.connection.port}`
  );
  cliLoggerService.info(`MongoDB version: ${connection.version}`);
  cliLoggerService.info(`MongoDB name: ${connection.connection.name}`);

  return connection;
}
