/* eslint-disable @typescript-eslint/camelcase */
import request, { SuperTest, Test } from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import AxiosMock from 'axios-mock-adapter';
import { connect } from '../database';
import app from '../app';
import { mockZoomHeader } from '../utils/utils';
import { createZoomMeeting } from '../utils/test/mocks/createZoomMeeting';
import { ZoomEvents } from '../definitions/enums';
import { mockZoomRequest } from '../utils/test/mocks/mockZoomRequest';
import { ZoomMeetingModel } from '../models/zoom/model';
import { Errors } from '../definitions/errors';
import { callHttp } from '../utils/http';

const mock = new AxiosMock(callHttp);

describe('zoom webhooks', () => {
  let server: SuperTest<Test>;
  beforeAll(async () => {
    await connect();
    server = request(app());
  });

  describe('security', () => {
    test('should return security error', async () => {
      const response = await server.post(`/zoom/meeting-started`).send({});
      expect(response.body.code).toBe(Errors.NOT_AUTHORIZED);
    });
  });

  describe('meeting started', () => {
    test('should create the started times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({});
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.STARTED,
            payload: { object: { id: zoomMeetingId } },
          })
        );
      const {
        startTimes,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(startTimes).toBeTruthy();
      expect(startTimes).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
    test('should add start time to existing started times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({
        startTimes: [new Date()],
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.STARTED,
            payload: { object: { id: zoomMeetingId } },
          })
        );
      const {
        startTimes,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(startTimes).toBeTruthy();
      expect(startTimes).toHaveLength(2);
      expect(meetingParticipants).toBe(0);
    });
    test('should not add the started times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({});
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: 'other',
            payload: { object: { id: zoomMeetingId } },
          })
        );
      const { startTimes } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(startTimes).toBeNull();
    });

    test('meeting not found', async () => {
      const { zoomMeetingId } = await createZoomMeeting({});
      const response = await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.STARTED,
            payload: { object: { id: 124353 } },
          })
        );
      const { startTimes } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(startTimes).toBeNull();
      expect(response.res.text).toBe(`{"code":"${Errors.GENERIC_ERROR}"}`);
      expect(response.res.statusCode).toBe(500);
    });
  });
  describe('meeting ended', () => {
    test('should create the end times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({
        meetingParticipants: 1,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.ENDED,
            payload: { object: { id: zoomMeetingId } },
          })
        );
      const { endTimes, meetingParticipants } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(endTimes).toBeTruthy();
      expect(endTimes).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
    test('should add end time to existing end times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({
        endTimes: [new Date()],
        meetingParticipants: 2,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.ENDED,
            payload: { object: { id: zoomMeetingId } },
          })
        );
      const { endTimes, meetingParticipants } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(endTimes).toBeTruthy();
      expect(endTimes).toHaveLength(2);
      expect(meetingParticipants).toBe(0);
    });
  });
  describe('Participant Joined', () => {
    test('should create the join times', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_JOINED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].joinTime).toHaveLength(1);
      expect(meetingParticipants).toBe(1);
    });
    test('should add join time to existing join time', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_JOINED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].joinTime).toHaveLength(2);
      expect(meetingParticipants).toBe(1);
    });
  });
  describe('Participant Left', () => {
    test('should create the left times', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_LEFT,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].leftTime).toBeTruthy();
      expect(participant[0].leftTime).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
    test('should add left times to existing left time', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
        leftTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_LEFT,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].leftTime).toBeTruthy();
      expect(participant[0].leftTime).toHaveLength(2);
      expect(meetingParticipants).toBe(0);
    });
    test('Participant not found', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJ2',
        email: 'coachmeapp.co@gmail.com',
      };
      const response = await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_LEFT,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );

      expect(response.res.text).toBe(`{"code":"${Errors.GENERIC_ERROR}"}`);
      expect(response.res.statusCode).toBe(500);
    });
  });
  describe('Participant Admitted', () => {
    test('should create the admitted times', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_ADMITTED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].admittedTime).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
    test('should add admitted time to existing admitted time', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        joinTime: [new Date()],
        leftTime: [new Date()],
        admittedTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_ADMITTED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].leftTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].admittedTime).toHaveLength(2);
      expect(meetingParticipants).toBe(1);
    });
    test('should end meeting if more than 2 participants', async () => {
      const participantInfo = [
        {
          user_id: '16778240',
          user_name: 'Coach me',
          id: 'fwT4EgoQSvGuAPsxob5iJQ',
          email: 'coachmeapp.co@gmail.com',
          joinWaitingRoomTime: [new Date()],
        },
        {
          user_id: '16778242',
          user_name: 'Coach me 2',
          id: 'fwT4EgoQSvGuAPsxob5iJ2',
          email: 'coachmeapp2.co@gmail.com',
          joinWaitingRoomTime: [new Date()],
          admittedTime: [new Date()],
          joinTime: [new Date()],
        },
        {
          user_id: '16778243',
          user_name: 'Coach me 3',
          id: 'fwT4EgoQSvGuAPsxob5iJ3',
          email: 'coachmeapp3.co@gmail.com',
          joinWaitingRoomTime: [new Date()],
          admittedTime: [new Date()],
          joinTime: [new Date()],
        },
      ];
      const { zoomMeetingId } = await createZoomMeeting({
        meetingParticipants: 2,
        participant: participantInfo,
      });
      mock
        .onPut(`https://api.zoom.us/v2/meetings/${zoomMeetingId}/status`)
        .reply(async () => {
          await server
            .post(`/zoom/webhooks`)
            .set(mockZoomHeader())
            .send(
              mockZoomRequest({
                event: ZoomEvents.ENDED,
                payload: {
                  object: { id: zoomMeetingId },
                },
              })
            );
          return [204];
        });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_ADMITTED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo[0] },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
        endTimes,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(3);
      expect(endTimes).toBeTruthy();
      expect(endTimes).toHaveLength(1);
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].admittedTime).toHaveLength(1);
      expect(participant[1].admittedTime).toBeTruthy();
      expect(participant[1].admittedTime).toHaveLength(1);
      expect(participant[2].admittedTime).toBeTruthy();
      expect(participant[2].admittedTime).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
  });
  describe('Participant Waiting Host', () => {
    test('should create the waiting host times', async () => {
      const participantInfo = {
        user_name: 'Coach me',
      };
      const { zoomMeetingId } = await createZoomMeeting({});
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_WAITING_HOST,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo },
            },
          })
        );
      const {
        participantWaiting,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participantWaiting).toBeTruthy();
      expect(participantWaiting).toHaveLength(1);
      expect(participantWaiting[0].waitingHostTime).toBeTruthy();
      expect(participantWaiting[0].waitingHostTime).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
    test('should add waiting host times to existing waiting host time', async () => {
      const participantInfo = {
        user_name: 'Coach me',
        waitingHostTime: [new Date()],
      };
      const participantInfo2 = {
        user_name: 'Coach me',
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participantWaiting: participantInfo,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_WAITING_HOST,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participantWaiting,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participantWaiting).toBeTruthy();
      expect(participantWaiting).toHaveLength(1);
      expect(participantWaiting[0].waitingHostTime).toBeTruthy();
      expect(participantWaiting[0].waitingHostTime).toHaveLength(2);
      expect(meetingParticipants).toBe(0);
    });
    test('should add participant to waiting', async () => {
      const participantInfo = {
        user_name: 'Coach me',
        waitingHostTime: [new Date()],
      };
      const participantInfo2 = {
        user_name: 'Coach me 2',
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participantWaiting: participantInfo,
      });
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_WAITING_HOST,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participantWaiting,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participantWaiting).toBeTruthy();
      expect(participantWaiting).toHaveLength(2);
      expect(participantWaiting[0].waitingHostTime).toBeTruthy();
      expect(participantWaiting[0].waitingHostTime).toHaveLength(1);
      expect(participantWaiting[1].waitingHostTime).toBeTruthy();
      expect(participantWaiting[1].waitingHostTime).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
  });
  describe('Participant Joined Waiting Room', () => {
    test('should create the join waiting room times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({});
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_JOINED_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].joinWaitingRoomTime).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
    test('should add participant', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778242',
        user_name: 'Coach me 2',
        id: 'fwT4EgoQSvGuAPsxob5iJ2',
        email: 'coachmeapp2.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_JOINED_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(2);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].joinWaitingRoomTime).toHaveLength(1);
      expect(participant[1].joinWaitingRoomTime).toBeTruthy();
      expect(participant[1].joinWaitingRoomTime).toHaveLength(1);
      expect(meetingParticipants).toBe(1);
    });
    test('should add join waiting room time to existing join waiting room time', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_JOINED_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].joinWaitingRoomTime).toHaveLength(2);
      expect(meetingParticipants).toBe(1);
    });
  });
  describe('Participant Left Waiting Room', () => {
    test('should create the left waiting room times', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_LEFT_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].leftWaitingRoomTime).toBeTruthy();
      expect(participant[0].joinWaitingRoomTime).toHaveLength(1);
      expect(meetingParticipants).toBe(1);
    });
    test('should add left waiting room times to left waiting room time', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        leftWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_LEFT_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].leftWaitingRoomTime).toBeTruthy();
      expect(participant[0].leftWaitingRoomTime).toHaveLength(2);
      expect(meetingParticipants).toBe(1);
    });
    test('Participant not found', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJ2',
        email: 'coachmeapp.co@gmail.com',
      };
      const response = await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_LEFT_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );

      expect(response.res.text).toBe(`{"code":"${Errors.GENERIC_ERROR}"}`);
      expect(response.res.statusCode).toBe(500);
    });
  });
  describe('Participant Put Waiting Room', () => {
    test('should create the put waiting room times', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_PUT_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].putWaitingRoomTime).toBeTruthy();
      expect(participant[0].putWaitingRoomTime).toHaveLength(1);
      expect(meetingParticipants).toBe(0);
    });
    test('should update waiting room times', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        putWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_PUT_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].putWaitingRoomTime).toHaveLength(2);
      expect(meetingParticipants).toBe(0);
    });
    test('Participant not found', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJ2',
        email: 'coachmeapp.co@gmail.com',
      };
      const response = await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.PARTICIPANT_PUT_WAITING_ROOM,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );

      expect(response.res.text).toBe(`{"code":"${Errors.GENERIC_ERROR}"}`);
      expect(response.res.statusCode).toBe(500);
    });
  });
  describe('Participant Shared Started', () => {
    test('should create the sharing started details', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        sharing_details: {
          link_source: '',
          file_link: '',
          source: '',
          date_time: '2021-02-20T02:05:29Z',
          content: 'desktop',
        },
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.SHARING_STARTED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].sharedStarted).toBeTruthy();
      expect(participant[0].sharedStarted).toHaveLength(1);
      expect(meetingParticipants).toBe(1);
    });
    test('should add sharing started details to existing', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
        sharedStarted: [
          {
            link_source: '',
            file_link: '',
            source: '',
            date_time: '2021-02-20T02:05:29Z',
            content: 'desktop',
          },
        ],
        sharedEnded: [
          {
            link_source: '',
            file_link: '',
            source: '',
            date_time: '2021-02-20T02:10:29Z',
            content: 'desktop',
          },
        ],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        sharing_details: {
          link_source: 'link2',
          file_link: '',
          source: '',
          date_time: '2021-02-20T02:05:29Z',
          content: 'desktop2',
        },
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.SHARING_STARTED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].sharedStarted).toBeTruthy();
      expect(participant[0].sharedEnded).toBeTruthy();
      expect(participant[0].sharedStarted).toHaveLength(2);
      expect(meetingParticipants).toBe(1);
    });
    test('Participant not found', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJ2',
        email: 'coachmeapp.co@gmail.com',
      };
      const response = await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.SHARING_STARTED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );

      expect(response.res.text).toBe(`{"code":"${Errors.GENERIC_ERROR}"}`);
      expect(response.res.statusCode).toBe(500);
    });
  });
  describe('Participant Shared Ended', () => {
    test('should create the sharing ended details', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
        sharedStarted: [
          {
            link_source: '',
            file_link: '',
            source: '',
            date_time: '2021-02-20T02:05:29Z',
            content: 'desktop',
          },
        ],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        sharing_details: {
          link_source: '',
          file_link: '',
          source: '',
          date_time: '2021-02-20T02:05:29Z',
          content: 'desktop',
        },
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.SHARING_ENDED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].sharedStarted).toBeTruthy();
      expect(participant[0].sharedEnded).toBeTruthy();
      expect(participant[0].sharedEnded).toHaveLength(1);
      expect(meetingParticipants).toBe(1);
    });
    test('should add sharing ended details to existing', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
        admittedTime: [new Date()],
        joinTime: [new Date()],
        sharedStarted: [
          {
            link_source: '',
            file_link: '',
            source: '',
            date_time: '2021-02-20T02:05:29Z',
            content: 'desktop',
          },
        ],
        sharedEnded: [
          {
            link_source: '',
            file_link: '',
            source: '',
            date_time: '2021-02-20T02:10:29Z',
            content: 'desktop',
          },
        ],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        sharing_details: {
          link_source: 'link2',
          file_link: '',
          source: '',
          date_time: '2021-02-20T02:05:29Z',
          content: 'desktop2',
        },
      };
      await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.SHARING_ENDED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );
      const {
        participant,
        meetingParticipants,
      } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(participant).toBeTruthy();
      expect(participant).toHaveLength(1);
      expect(participant[0].joinWaitingRoomTime).toBeTruthy();
      expect(participant[0].admittedTime).toBeTruthy();
      expect(participant[0].joinTime).toBeTruthy();
      expect(participant[0].sharedStarted).toBeTruthy();
      expect(participant[0].sharedEnded).toBeTruthy();
      expect(participant[0].sharedEnded).toHaveLength(2);
      expect(meetingParticipants).toBe(1);
    });
    test('Participant not found', async () => {
      const participantInfo = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJQ',
        email: 'coachmeapp.co@gmail.com',
        joinWaitingRoomTime: [new Date()],
      };
      const { zoomMeetingId } = await createZoomMeeting({
        participant: participantInfo,
        meetingParticipants: 1,
      });
      const participantInfo2 = {
        user_id: '16778240',
        user_name: 'Coach me',
        id: 'fwT4EgoQSvGuAPsxob5iJ2',
        email: 'coachmeapp.co@gmail.com',
      };
      const response = await server
        .post(`/zoom/webhooks`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.SHARING_ENDED,
            payload: {
              object: { id: zoomMeetingId, participant: participantInfo2 },
            },
          })
        );

      expect(response.res.text).toBe(`{"code":"${Errors.GENERIC_ERROR}"}`);
      expect(response.res.statusCode).toBe(500);
    });
  });
});
