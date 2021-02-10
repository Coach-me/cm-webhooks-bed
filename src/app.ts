import express from 'express';
import bodyParser from 'body-parser';
import requestLoggingMiddleware from './middleware/requestLogging';
import errorMiddleware from './middleware/error';
import authorizationWebhook from './middleware/authorizationWebhook';
import ZoomRouter from './routes/zoom';

require('express-async-errors');
// Handles Async errors so Error Middleware can catch them

const application = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(requestLoggingMiddleware);
  app.use(authorizationWebhook);
  app.use(ZoomRouter());
  app.use(errorMiddleware);
  return app;
};

export default application;
