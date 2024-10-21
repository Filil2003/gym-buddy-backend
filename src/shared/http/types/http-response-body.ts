import type { HttpError } from '@shared/errors/http.error.js';
import type { DebugInfo } from './debug-info.js';

interface SuccessHttpResponseBody<T> {
  requestId: string;
  data: T;
  debugInfo?: DebugInfo;
}

interface ErrorHttpResponseBody {
  requestId: string;
  error: HttpError;
  debugInfo?: DebugInfo;
}

export type HttpResponseBody<T = unknown> =
  | SuccessHttpResponseBody<T>
  | ErrorHttpResponseBody;
