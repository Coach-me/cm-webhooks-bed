import { ReturnModelType } from '@typegoose/typegoose';
import { QueryMethod } from '@typegoose/typegoose/lib/types';
import { ZoomMeeting } from './model';

export function findZoomMeetingById(
  this: ReturnModelType<typeof ZoomMeeting, ZoomMeetingHelpers>,
  zoomMeetingId: number
) {
  return this.find({ zoomMeetingId });
}

export interface ZoomMeetingHelpers {
  findZoomMeetingById: QueryMethod<typeof findZoomMeetingById>;
}
