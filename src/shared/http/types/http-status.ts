import type { HttpStatusCode, HttpStatusMessage } from '../enums/index.js';

export interface HttpStatus {
  statusCode: HttpStatusCode;
  statusMessage: HttpStatusMessage;
}
