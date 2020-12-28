import { MiddlewareFn } from 'type-graphql';
import logging from '../logging';

export const ErrorInterceptor: MiddlewareFn<any> = async ({ info }, next) => {
  try {
    const { fieldName } = info;
    logging.info(`fieldName-- ${fieldName}`);
    return await next();
  } catch (err) {
    logging.error(`${err}`);
    throw err;
  }
};
