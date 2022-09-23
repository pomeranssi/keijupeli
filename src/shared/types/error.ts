import { ucFirst } from '../util/strings';

export class GameError extends Error {
  public code: string;
  public cause: any;
  public status: number;
  public data: any;
  constructor(code: string, cause: any, status: number, data?: any) {
    super(String(cause));
    this.code = code;
    this.cause = cause;
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, GameError.prototype);
  }
}

export class NotFoundError extends GameError {
  constructor(code: string, name: string, id?: string | number) {
    super(code, `${ucFirst(name)}${id ? ` with id ${id}` : ''} not found`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class AuthenticationError extends GameError {
  constructor(code: string, cause: any, data?: any) {
    super(code, cause, 401, data);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class TokenNotPresentError extends GameError {
  constructor() {
    super('TOKEN_MISSING', 'Authorization token missing', 401);
    Object.setPrototypeOf(this, TokenNotPresentError.prototype);
  }
}
