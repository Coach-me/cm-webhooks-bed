import express, { Express } from 'express';
import bodyParser from 'body-parser';
import requestLoggingMiddleware from './middleware/requestLogging';
import { callHttp } from './utils/http';
import ZoomRouter from './routes/zoom';

const application = async (): Promise<Express> => {
  const app = express();
  await callHttp.get('https://www.google.com');
  app.use(requestLoggingMiddleware);
  app.use(bodyParser.json());
  app.use(ZoomRouter());
  return app;
};

export default application;
