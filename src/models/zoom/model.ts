// eslint-disable-next-line max-classes-per-file
import mongoose from 'mongoose';
import {
  getModelForClass,
  modelOptions,
  prop,
  queryMethod,
  Severity,
} from '@typegoose/typegoose';

import { findZoomMeetingById, ZoomMeetingHelpers } from './methods';

export class SharedScreen {
  @prop({ required: false })
  public content: string;

  @prop({ required: false })
  public link_source: string;

  @prop({ required: false })
  public file_link: string;

  @prop({ required: false })
  public date_time: string;

  @prop({ required: false })
  public source: string;
}

export class ParticipantWaiting {
  @prop({ required: true })
  public user_name: string;

  @prop({ required: true, length: 0 })
  public waitingHostTime: Date[];
}

export class Participant {
  @prop({ required: true })
  public user_id: number;

  @prop({ required: true })
  public user_name: string;

  @prop({ required: false })
  public id: string;

  @prop({ required: false, length: 0 })
  public joinTime: Date[];

  @prop({ required: false, length: 0 })
  public leftTime: Date[];

  @prop({ required: false, length: 0 })
  public joinWaitingRoomTime: Date[];

  @prop({ required: false, length: 0 })
  public leftWaitingRoomTime: Date[];

  @prop({ required: false, length: 0 })
  public putWaitingRoomTime: Date[];

  @prop({ required: false, length: 0 })
  public admittedTime: Date[];

  @prop({ required: false })
  public email: string;

  @prop({ required: false, length: 0 })
  public sharedStarted: SharedScreen[];

  @prop({ required: false, length: 0 })
  public sharedEnded: SharedScreen[];
}

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@queryMethod(findZoomMeetingById)
export class ZoomMeeting {
  public id: string;

  @prop({ required: true })
  public zoomMeetingId: number;

  @prop({ required: true })
  public start_url: string;

  @prop({ required: true })
  public join_url: string;

  @prop({ required: true })
  public created_at: Date;

  @prop({ required: true })
  public duration: number;

  @prop({ required: true })
  public encrypted_password: string;

  @prop({ required: true })
  public h323_password: string;

  @prop({ required: true })
  public host_email: string;

  @prop({ required: true })
  public host_id: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true })
  public pstn_password: string;

  @prop({ required: true })
  public start_time: Date;

  @prop({ required: true })
  public status: string;

  @prop({ required: true })
  public timezone: string;

  @prop({ required: true })
  public topic: string;

  @prop({ required: true })
  public type: number;

  @prop({ required: true })
  public uuid: string;

  @prop({ required: false, length: 0 })
  public startTimes: Date[];

  @prop({ required: false, length: 0 })
  public endTimes: Date[];

  @prop({ required: false, length: 0 })
  public participant: Participant[];

  @prop({ required: false, length: 0 })
  public participantWaiting: ParticipantWaiting[];

  @prop({ required: true })
  public meetingParticipants: number;

  @prop({ required: true })
  public settings: object;
}

export const ZoomMeetingModel = getModelForClass<
  typeof ZoomMeeting,
  ZoomMeetingHelpers
>(ZoomMeeting, {
  existingMongoose: mongoose,
  schemaOptions: { collection: 'zoomMeeting' },
});
