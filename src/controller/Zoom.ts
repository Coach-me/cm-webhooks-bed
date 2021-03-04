import { Request, Response } from 'express';
import ZoomService from '../services/ZoomService';
import { ZoomEvents } from '../definitions/enums';

export default class ZoomController {
  webhooks = async (req: Request, res: Response) => {
    const { body } = req;
    const event = body?.event;
    if (event === ZoomEvents.STARTED) {
      await this.meetingStarted(req, res);
    }
    if (event === ZoomEvents.ENDED) {
      await this.meetingEnded(req, res);
    }
    if (event === ZoomEvents.PARTICIPANT_JOINED) {
      await this.participantJoined(req, res);
    }
    if (event === ZoomEvents.PARTICIPANT_WAITING_HOST) {
      await this.participantWaitingHost(req, res);
    }
    if (event === ZoomEvents.PARTICIPANT_JOINED_WAITING_ROOM) {
      await this.participantJoinedWaitingRoom(req, res);
    }
    if (event === ZoomEvents.PARTICIPANT_LEFT_WAITING_ROOM) {
      await this.participantLeftWaitingRoom(req, res);
    }
    if (event === ZoomEvents.PARTICIPANT_PUT_WAITING_ROOM) {
      await this.participantPutWaitingRoom(req, res);
    }
    if (event === ZoomEvents.PARTICIPANT_ADMITTED) {
      await this.participantAdmitted(req, res);
    }
    if (event === ZoomEvents.PARTICIPANT_LEFT) {
      await this.participantLeft(req, res);
    }
    if (event === ZoomEvents.SHARING_ENDED) {
      await this.sharingEnded(req, res);
    }
    if (event === ZoomEvents.SHARING_STARTED) {
      await this.sharingStarted(req, res);
    }
  };

  meetingStarted = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.meetingStarted(req.body);
    res.json({ ok: 'ok' });
  };

  meetingEnded = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.meetingEnded(req.body);
    res.json({ ok: 'ok' });
  };

  participantJoined = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.participantJoined(req.body);
    res.json({ ok: 'ok' });
  };

  participantLeft = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.participantLeft(req.body);
    res.json({ ok: 'ok' });
  };

  participantAdmitted = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.participantAdmitted(req.body);
    res.json({ ok: 'ok' });
  };

  sharingStarted = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.sharingStarted(req.body);
    res.json({ ok: 'ok' });
  };

  sharingEnded = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.sharingEnded(req.body);
    res.json({ ok: 'ok' });
  };

  participantWaitingHost = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.participantWaitingHost(req.body);
    res.json({ ok: 'ok' });
  };

  participantJoinedWaitingRoom = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.participantJoinedWaitingRoom(req.body);
    res.json({ ok: 'ok' });
  };

  participantLeftWaitingRoom = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.participantLeftWaitingRoom(req.body);
    res.json({ ok: 'ok' });
  };

  participantPutWaitingRoom = async (req: Request, res: Response) => {
    const zoomService = new ZoomService();
    await zoomService.participantPutWaitingRoom(req.body);
    res.json({ ok: 'ok' });
  };
}
