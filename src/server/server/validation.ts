import { z, ZodError } from 'zod';

import { GameError } from 'shared/types';

export function validate<T extends z.ZodTypeAny>(
  data: unknown,
  codec: T,
  context: string
): z.output<T> {
  try {
    return codec.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new DataValidationError(e, data, context);
    } else throw e;
  }
}

export function validateOr<T extends z.ZodTypeAny>(
  data: unknown,
  codec: T | undefined,
  def: z.output<T>,
  context: string
): z.output<T> {
  return codec ? validate(data, codec, context) : def;
}

export class DataValidationError extends GameError {
  constructor(error: ZodError, data: any, context: string) {
    super('VALIDATION_ERROR', `Data format is invalid at ${context}`, 400, {
      data,
      error: error.format(),
    });
    Object.setPrototypeOf(this, DataValidationError.prototype);
  }
}
