import logging from '../logging';
// forces me to use `any` :\

const requestLoggingMiddleware = async (req, res, next): Promise<void> => {
  const httpMethod = req.method || 'UnknownMethod';
  const originalUrl = req.originalUrl || 'Unknown URL';

  logging.info(`${httpMethod} request to ${originalUrl}`);

  next();
};

export default requestLoggingMiddleware;
