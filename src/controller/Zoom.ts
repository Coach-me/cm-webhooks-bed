import { Request, Response } from 'express';
import ZoomService from '../services/ZoomService';

export default class ZoomController {
  meetingStarted = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.meetingStarted(req.body);
    res.json({ ok: 'ok' });
  };
}
