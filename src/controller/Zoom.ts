import { Request, Response } from 'express';

export default class ZoomController {
  meetingStarted = async (req: Request, res: Response) => {
    console.log('req', req.body);
    res.json({ ok: 'ok' });
  };
}
