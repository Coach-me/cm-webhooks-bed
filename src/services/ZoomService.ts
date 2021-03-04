/* eslint-disable @typescript-eslint/camelcase */
import _ from 'lodash';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { ZoomMeetingModel } from '../models/zoom/model';
import logging from '../logging';
import { getMessage } from '../utils/getMessage';
import { callHttp } from '../utils/http';

export default class ZoomService {
  async meetingStarted(meetingStarted) {
    logging.debug(`Incoming body request %o`, meetingStarted);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      meetingStarted
    );
    const startTimes = meeting.startTimes || [];
    startTimes.push(date);
    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { startTimes, meetingParticipants: 0 }
    );
    logging.info(`add startTimes to ${zoomMeetingId}`);
    // TODO Enviar Notificación por Correo
  }

  async meetingEnded(meetingEnded) {
    logging.debug(`Incoming body request %o`, meetingEnded);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      meetingEnded
    );
    const endTimes = meeting.endTimes || [];
    endTimes.push(date);
    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { endTimes, meetingParticipants: 0 }
    );
    logging.info(`add endTimes to ${zoomMeetingId}`);
  }

  async participantLeft(participantLeft) {
    logging.debug(`Incoming body request %o`, participantLeft);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      participantLeft
    );
    const { participants, index } = await this.getParticipantData(
      participantLeft,
      meeting
    );

    const participantsOut = await this.createUpdateArrayTime(
      index,
      participants,
      date,
      'leftTime'
    );

    const meetingParticipants = meeting.meetingParticipants - 1;
    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut, meetingParticipants }
    );
    logging.info(`Participant Left to ${zoomMeetingId}`);
  }

  async participantJoined(participantJoined) {
    logging.debug(`Incoming body request %o`, participantJoined);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      participantJoined
    );
    const { participants, index } = await this.getParticipantData(
      participantJoined,
      meeting
    );

    const participantsOut = await this.createUpdateArrayTime(
      index,
      participants,
      date,
      'joinTime'
    );

    const meetingParticipants = meeting.meetingParticipants + 1;
    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut, meetingParticipants }
    );
    logging.info(`Participant Joined to ${zoomMeetingId}`);
  }

  async participantAdmitted(participantAdmitted) {
    logging.debug(`Incoming body request %o`, participantAdmitted);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      participantAdmitted
    );
    const { participants, index } = await this.getParticipantData(
      participantAdmitted,
      meeting
    );

    const participantsOut = await this.createUpdateArrayTime(
      index,
      participants,
      date,
      'admittedTime'
    );

    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut }
    );
    logging.info(`Participant Admitted ${zoomMeetingId}`);
    if (meeting.meetingParticipants >= 2) {
      // TODO ENVIAR NOTIFICACION POR CORREO
      await this.endMeeting(zoomMeetingId);
    }
  }

  async participantWaitingHost(participantWaitingHost) {
    logging.debug(`Incoming body request %o`, participantWaitingHost);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      participantWaitingHost
    );

    // TODO NOTIFICACION COACH QUE LO ESTAN ESPERANDO

    const participantName =
      participantWaitingHost.payload?.object?.participant?.user_name;
    const participants = meeting.participantWaiting || [];
    const participant = {
      ...participantWaitingHost.payload?.object?.participant,
    };
    const index = _.findIndex(participants, { user_name: participantName });

    const participantsOut = await this.createUpdateArrayTimeNewParticipant(
      index,
      participant,
      participants,
      date,
      'waitingHostTime'
    );

    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participantWaiting: participantsOut }
    );
    logging.info(`Participant waiting host at meeting ${zoomMeetingId}`);
  }

  async participantJoinedWaitingRoom(participantJoinedWaitingRoom) {
    logging.debug(`Incoming body request %o`, participantJoinedWaitingRoom);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      participantJoinedWaitingRoom
    );
    const { participants, participant, index } = await this.getParticipantData(
      participantJoinedWaitingRoom,
      meeting
    );
    const participantsOut = await this.createUpdateArrayTimeNewParticipant(
      index,
      participant,
      participants,
      date,
      'joinWaitingRoomTime'
    );

    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut }
    );

    if (meeting.meetingParticipants >= 2) {
      // TODO NOTIFICACION CORREO QUE SI ACEPTA LA LLAMADA TERMINARA
    }
    logging.info(`Participant joined waiting room at meeting ${zoomMeetingId}`);
  }

  async participantLeftWaitingRoom(participantLeftWaitingRoom) {
    logging.debug(`Incoming body request %o`, participantLeftWaitingRoom);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      participantLeftWaitingRoom
    );
    const { participants, index } = await this.getParticipantData(
      participantLeftWaitingRoom,
      meeting
    );

    const participantsOut = await this.createUpdateArrayTime(
      index,
      participants,
      date,
      'leftWaitingRoomTime'
    );

    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut }
    );
    logging.info(`Participant left waiting room at meeting ${zoomMeetingId}`);
  }

  async participantPutWaitingRoom(participantPutWaitingRoom) {
    logging.debug(`Incoming body request %o`, participantPutWaitingRoom);
    const { zoomMeetingId, date, meeting } = await this.getBasicData(
      participantPutWaitingRoom
    );
    const { participants, index } = await this.getParticipantData(
      participantPutWaitingRoom,
      meeting
    );

    const participantsOut = await this.createUpdateArrayTime(
      index,
      participants,
      date,
      'putWaitingRoomTime'
    );

    const meetingParticipants = meeting.meetingParticipants - 1;
    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut, meetingParticipants }
    );
    logging.info(`Participant put waiting room at meeting ${zoomMeetingId}`);
  }

  async sharingStarted(sharingStarted) {
    logging.debug(`Incoming body request %o`, sharingStarted);
    const { zoomMeetingId, meeting } = await this.getBasicData(sharingStarted);
    const { participants, sharingDetails, index } = await this.getSharingData(
      sharingStarted,
      meeting
    );

    const participantsOut = await this.createUpdateArrayTime(
      index,
      participants,
      sharingDetails,
      'sharedStarted'
    );

    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut }
    );
    logging.info(`Shared screen started to ${zoomMeetingId}`);
  }

  async sharingEnded(sharingEnded) {
    logging.debug(`Incoming body request %o`, sharingEnded);
    const { zoomMeetingId, meeting } = await this.getBasicData(sharingEnded);
    const { participants, sharingDetails, index } = await this.getSharingData(
      sharingEnded,
      meeting
    );

    const participantsOut = await this.createUpdateArrayTime(
      index,
      participants,
      sharingDetails,
      'sharedEnded'
    );

    await ZoomMeetingModel.updateOne(
      { zoomMeetingId },
      { participant: participantsOut }
    );
    logging.info(`Shared screen ended to ${zoomMeetingId}`);
  }

  async endMeeting(zoomMeetingId) {
    const body = {
      action: 'end',
    };
    const jwtToken = await new ZoomService().generateZoomJWTToken();
    await new ZoomService().zoomPut(
      `https://api.zoom.us/v2/meetings/${zoomMeetingId}/status`,
      body,
      jwtToken
    );
    logging.info(
      `Meeting Ended ${zoomMeetingId}, due to more than 2 participants`
    );
  }

  async getMeeting(zoomMeetingId: number) {
    const meeting = await ZoomMeetingModel.findOne({ zoomMeetingId });
    if (!meeting) {
      logging.info(`Meeting not found`);
      getMessage(`Meeting not found`);
    }
    return meeting;
  }

  async getBasicData(req) {
    const zoomMeetingId = req.payload?.object?.id;
    const dateTs = req.payload?.object?.event_ts;
    const date = new Date(moment(dateTs).format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
    const meeting = await this.getMeeting(zoomMeetingId);

    return {
      zoomMeetingId,
      date,
      meeting,
    };
  }

  async getParticipantData(req, meeting) {
    const participantId = req.payload?.object?.participant?.id;
    const participants = meeting.participant || [];
    const participant = { ...req.payload?.object?.participant };
    const index = _.findIndex(participants, { id: participantId });

    return {
      participants,
      participant,
      index,
    };
  }

  async getSharingData(req, meeting) {
    const participantId = req.payload?.object?.participant?.id;
    const participants = meeting.participant || [];
    const sharingDetails = {
      ...req.payload?.object?.participant?.sharing_details,
    };
    const index = _.findIndex(participants, { id: participantId });

    return {
      participants,
      sharingDetails,
      index,
    };
  }

  async createUpdateArrayTimeNewParticipant(
    index,
    participantIn,
    participantsIn,
    date,
    property
  ) {
    const participantsOut = participantsIn;
    if (index === -1) {
      const participant = participantIn;
      participant[property] = [];
      participant[property].push(date);
      participantsOut.push(participant);
    } else {
      participantsOut[index][property] = participantsOut[index][property] || [];
      participantsOut[index][property].push(date);
    }
    return participantsOut;
  }

  async createUpdateArrayTime(index, participantsIn, object, property) {
    if (index === -1) {
      logging.info(`Participant not found`);
      getMessage(`Participant not found`);
    }
    const participantsOut = participantsIn;
    participantsOut[index][property] = participantsOut[index][property] || [];
    participantsOut[index][property].push(object);

    return participantsOut;
  }

  async generateZoomJWTToken() {
    const apiSecret =
      process.env.NODE_ENV === 'test'
        ? 'apiSecret'
        : process.env.ZOOM_API_SECRET;

    const payload =
      process.env.NODE_ENV === 'test'
        ? {
            iss: 'payload',
          }
        : {
            iss: process.env.ZOOM_API_KEY,
          };

    return jwt.sign(payload, apiSecret, { expiresIn: 30 });
  }

  async zoomPut(url, body: {}, jwtToken) {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    logging.debug('Zoom body post %o', body);
    logging.debug('Zoom url post %o', url);
    return callHttp.put(
      url,
      {
        ...body,
      },
      {
        headers,
      }
    );
  }
}
