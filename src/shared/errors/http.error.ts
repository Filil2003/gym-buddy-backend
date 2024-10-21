import { STATUS_CODES } from 'node:http';
import { inspect } from 'node:util';
import type { DebugInfo, HttpStatus } from '@shared/http/types/index.js';
import type { Response } from 'express';

export class HttpError extends Error {
  public readonly statusCode: HttpStatus['statusCode'];
  public readonly statusMessage: HttpStatus['statusMessage'];
  private readonly debugInfo: DebugInfo;

  constructor(
    message: string,
    statusCode: HttpStatus['statusCode'],
    cause?: Error
  ) {
    super(message, { cause });

    this.statusCode = statusCode;
    this.statusMessage = STATUS_CODES[
      this.statusCode
    ] as HttpStatus['statusMessage'];

    this.name = this.constructor.name;

    this.debugInfo = {
      statusCode: this.statusCode,
      statusMessage: this.statusMessage,
      errorName: this.name,
      errorMessage: this.message,
      stack: inspect(this, {
        showHidden: false,
        depth: Number.POSITIVE_INFINITY
      })
    };

    Object.freeze(this);
  }

  public saveDebugInfoToResponseLocals(res: Response): void {
    res.locals['debugInfo'] = this.debugInfo;
  }

  public toJSON(): { name: string; message: string } {
    return {
      name: this.name,
      message: this.message
    };
  }
}
