import type { HttpStatus } from '../types/http-status.js';

export type DebugInfo = HttpStatus & {
  errorName: string;
  errorMessage: string;
  stack?: string;
};
