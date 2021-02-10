import { ZoomMeetingModel } from '../models/zoom/model';
import logging from '../logging';
import { getMessage } from '../utils/getMessage';

export default class ZoomService {
  async meetingStarted(meetingStarted) {
    logging.debug(`Incoming body request %o`, meetingStarted);
    const zoomMeetingId = meetingStarted.payload?.object?.id;
    const meeting = await this.getMeeting(zoomMeetingId);
    const startTimes = meeting.startTimes || [];
    startTimes.push(new Date());
    await ZoomMeetingModel.updateOne({ zoomMeetingId }, { startTimes });
    logging.info(`add startTimes to ${zoomMeetingId}`);
  }

  async getMeeting(zoomMeetingId: number) {
    const meeting = await ZoomMeetingModel.findOne({ zoomMeetingId });
    if (!meeting) {
      logging.info(`Meeting not found`);
      getMessage(`Meeting not found`);
    }
    return meeting;
  }
}
