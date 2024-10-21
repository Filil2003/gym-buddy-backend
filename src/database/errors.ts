export class MongoDbError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
  }
}
