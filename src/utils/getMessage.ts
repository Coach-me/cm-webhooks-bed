import { GenericError } from '../error';
import { Errors } from '../definitions/errors';

export const getMessage = (message, code = Errors.GENERIC_ERROR) => {
  throw new GenericError(code, message);
};
