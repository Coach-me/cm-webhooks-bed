import { Request, Response } from 'express';
import logging from '../logging';
import { getMessage } from '../utils/getMessage';
import { Errors } from '../definitions/errors';

const authorizationWebhook = (req: Request, _res: Response, next) => {
  const { headers } = req;
  const isValid =
    headers.authorization === process.env.ZOOM_WEBHOOK_AUTHORIZATION;
  logging.info(`authorization webhook is ${isValid}`);
  if (!isValid) {
    getMessage('No valid webhook', Errors.NOT_AUTHORIZED);
  }
  next();
};

export default authorizationWebhook;
