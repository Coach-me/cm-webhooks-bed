import { Request, Response } from 'express';
import _ from 'lodash';

import error, { GenericError } from '../error';
import logging from '../logging';

class FormatStructure {
  code: any;

  errorValidation?: any;

  errorDebug?: any;
}

function wrap(err: any): GenericError {
  // eslint-disable-next-line import/no-named-as-default-member
  if (err instanceof error.GenericError) {
    return err;
  }

  const httpCode = err.status || 'INTERNAL';

  return error(`HTTP_${httpCode}`, err);
}

function status(err: any): any {
  return _.get(err, 'status', 500);
}

function format(err: any): FormatStructure | null {
  // eslint-disable-next-line import/no-named-as-default-member
  if (err instanceof error.GenericError) {
    return {
      code: err.error,
      errorDebug: process.env.NODE_ENV === 'DEV' ? err.nested : undefined,
    };
  }
  return null;
}

function log(err: any): void {
  logging.error(err);
}

// eslint-disable-next-line no-shadow,@typescript-eslint/no-unused-vars
export default function (error: Error, req: Request, res: Response, _next) {
  const err = wrap(error);
  log(err);
  res.status(status(err));
  res.json(format(err));
}
