import { Request, Response } from 'express';
import { ZoomEvents } from '../definitions/enums';
import logging from '../logging';
import { getMessage } from '../utils/getMessage';

export const eventChecker = () => (req: Request, _res: Response, next) => {
  const events = Object.values(ZoomEvents);
  const { body } = req;
  const event = body?.event;
  const isValid = events.indexOf(event);
  if (isValid === -1) {
    getMessage('Invalid Event');
  }
  logging.info(`Incoming event ${event} is true`);
  next();
};
