import { Request, Response } from 'express';
import { ZoomEvents } from '../definitions/enums';
import logging from '../logging';
import { getMessage } from '../utils/getMessage';

export const eventChecker = (zoomEvent: ZoomEvents) => (
  req: Request,
  _res: Response,
  next
) => {
  const { body } = req;
  const event = body?.event;
  const isValid = event === zoomEvent;
  logging.info(`Incoming event ${event} is ${isValid}`);
  if (!isValid) {
    getMessage('Invalid Event');
  }
  next();
};
