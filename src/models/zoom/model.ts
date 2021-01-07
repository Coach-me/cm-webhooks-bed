import mongoose from 'mongoose';
import {
  getModelForClass,
  modelOptions,
  prop,
  queryMethod,
  Severity,
} from '@typegoose/typegoose';

import { findZoomMeetingById, ZoomMeetingHelpers } from './methods';

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
