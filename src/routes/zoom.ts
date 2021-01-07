import express from 'express';
import asyncHandler from 'express-async-handler';
import { eventChecker } from '../middleware/eventChecker';
import ZoomController from '../controller/Zoom';
import { ZoomEvents } from '../definitions/enums';

const router = () => {
  const base = '/zoom';
  const theRouter = express.Router();
  const zoomController = new ZoomController();
  theRouter.post(
    `${base}/meeting-started`,
    eventChecker(ZoomEvents.STARTED),
    asyncHandler(zoomController.meetingStarted)
  );
  return theRouter;
};

export default router;
