import { ZoomEvents } from '../../../definitions/enums';

interface MockZoomRequest {
  event: ZoomEvents | string;
  payload: object;
}
export const mockZoomRequest = ({ event, payload }: MockZoomRequest) => {
  return { event, payload };
};
