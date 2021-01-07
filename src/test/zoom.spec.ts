import request, { SuperTest, Test } from 'supertest';
import { connect } from '../database';

import app from '../app';
import { mockZoomHeader } from '../utils/utils';
import { createZoomMeeting } from '../utils/test/mocks/createZoomMeeting';
import { ZoomEvents } from '../definitions/enums';
import { mockZoomRequest } from '../utils/test/mocks/mockZoomRequest';
import { ZoomMeetingModel } from '../models/zoom/model';
import { Errors } from '../definitions/errors';

describe('zoom webhooks', () => {
  let server: SuperTest<Test>;
  beforeAll(async () => {
    await connect();
    server = request(app());
  });

  describe('security', () => {
    test('should return security error', async () => {
      const response = await server.post(`/zoom/meeting-started`).send({});
      expect(response.text.code).toBe(Errors.NOT_AUTHORIZED);
    });
  });

  describe('meeting started', () => {
    test('should create the the started times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({});
      await server
        .post(`/zoom/meeting-started`)
        .set(mockZoomHeader())
        .send(
          mockZoomRequest({
            event: ZoomEvents.STARTED,
            payload: { object: { id: zoomMeetingId } },
          })
        );
      const { startTimes } = await ZoomMeetingModel.findOne({
        zoomMeetingId,
      });
      expect(startTimes).toBeTruthy();
      expect(startTimes).toHaveLength(1);
    });

    test('should not add the the started times', async () => {
      const { zoomMeetingId } = await createZoomMeeting({});
      await server
        .post(`/zoom/meeting-started`)
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
  });
});
