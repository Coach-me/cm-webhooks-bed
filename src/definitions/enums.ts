export enum ZoomEvents {
  STARTED = 'meeting.started',
  ENDED = 'meeting.ended',
  PARTICIPANT_JOINED = 'meeting.participant_joined',
  PARTICIPANT_LEFT = 'meeting.participant_left',
  PARTICIPANT_ADMITTED = 'meeting.participant_admitted',
  SHARING_STARTED = 'meeting.sharing_started',
  SHARING_ENDED = 'meeting.sharing_ended',
  PARTICIPANT_WAITING_HOST = 'meeting.participant_jbh_waiting',
  PARTICIPANT_JOINED_WAITING_ROOM = 'meeting.participant_joined_waiting_room',
  PARTICIPANT_LEFT_WAITING_ROOM = 'meeting.participant_left_waiting_room',
  PARTICIPANT_PUT_WAITING_ROOM = 'meeting.participant_put_in_waiting_room',
}
