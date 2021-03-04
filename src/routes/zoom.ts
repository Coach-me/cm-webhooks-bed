import express from 'express';
import asyncHandler from 'express-async-handler';
import ZoomController from '../controller/Zoom';
import { eventChecker } from '../middleware/eventChecker';

const router = () => {
  const base = '/zoom';
  const theRouter = express.Router();
  const zoomController = new ZoomController();
  theRouter.post(
    `${base}/webhooks`,
    eventChecker(),
    asyncHandler(zoomController.webhooks)
  );

  return theRouter;
};

export default router;
