import * as https from 'https';
import * as http from 'http';
import axios from 'axios';
import logging from '../logging';

export const callHttp = axios.create({
  // 60 sec timeout
  timeout: 60000,

  // keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,

  // cap the maximum content length we'll accept to 50MBs, just in case
  maxContentLength: 50 * 1000 * 1000,
});

callHttp.interceptors.request.use(
  (config) => {
    const { url, data, method } = config;
    logging.info(`url - ${url} method - ${method} data - ${data}`);
    return config;
  },
  (error) => {
    logging.error(error);
    return Promise.reject(error);
  }
);

callHttp.interceptors.response.use(
  (response) => {
    const {
      status,
      config: { url, method, data },
    } = response;
    logging.info(
      `status -- ${status} --- url- ${url} method- ${method} data- ${data}`
    );
    return response;
  },
  (error) => {
    logging.error(error);
    return Promise.reject(error);
  }
);
