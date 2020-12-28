import express from 'express';
import asyncHandler from 'express-async-handler';
import ZoomController from '../controller/Zoom';

const router = () => {
  const base = '/zoom';
  const theRouter = express.Router();
  const zoomController = new ZoomController();
  theRouter.post(
    `${base}/meeting-started`,
    asyncHandler(zoomController.meetingStarted)
  );
  return theRouter;
};

export default router;
