// eslint-disable-next-line max-classes-per-file
import NestedError from 'nested-error-stacks';
import { Errors } from './definitions/errors';

export class GenericError extends NestedError {
  error: any;

  code: any;

  status: any;

  nested: any;

  target: any;

  constructor(ec: Errors | string, cause?: any, status?: any, type?: any) {
    super(ec, cause);
    this.error = ec;
    this.code = ec;
    this.status = status;
  }
}

export class DatabaseError extends GenericError {}
export class HttpError extends GenericError {}

function error(ec: any, cause?: any, status?: any) {
  if (ec.startsWith('DB_')) {
    return new DatabaseError(ec, cause, status || 500);
  }

  if (!status) {
    // eslint-disable-next-line no-param-reassign
    status = 400;
  }

  if (ec.startsWith('HTTP_')) {
    return new HttpError(ec, cause, status);
  }

  return new GenericError(ec, cause, status || 400);
}

function wrapper(ErrorClass: any) {
  return function (ec: any, cause?: any, status?: any) {
    throw new ErrorClass(ec, cause, status);
  };
}

error.db = wrapper(DatabaseError);
error.DatabaseError = DatabaseError;
error.GenericError = GenericError;
error.HttpError = HttpError;

export default error;
