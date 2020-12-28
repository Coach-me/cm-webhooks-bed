import { createLogger, format, transports } from 'winston';
import _ from 'lodash';

require('dotenv-safe').config();

const logLevel = process.env.LOG_LEVEL || 'info';

/* This blog post has some good information on configuring winston if you want to customize it.
 * https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js
 */

const getDetailsFromFile = (fileDetails) => {
  const fileAndRow = fileDetails
    .split('at ')
    .pop()
    .split('(')
    .pop()
    .replace(')', '')
    .split(':');

  const detailsFromFile = {
    file: fileAndRow[0].trim(),
    line: fileAndRow[1],
    row: fileAndRow[2],
    formattedInfos: {},
  };

  detailsFromFile.formattedInfos = Object.keys(detailsFromFile).reduce(
    (previous, key) => `---${previous}-${key}:${detailsFromFile[key]}\n`
  );

  return detailsFromFile;
};

const appFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.metadata(),
  format.colorize(),
  format.label({
    label: `cm-appointments-bed`,
  }),
  format.prettyPrint(),
  format.json(),
  format.printf((info) => {
    const errorStack = info.metadata?.stack;
    const { timestamp, ...rest } = info.metadata;
    const message = errorStack
      ? info.metadata.nested || info.message
      : info.message;
    return `${info.label} - ${timestamp} - ${info.level} - ${message}${
      errorStack ? `\n${errorStack}--${getDetailsFromFile(errorStack)}` : ''
    } ${!_.isEmpty(rest) ? `-${JSON.stringify(rest)}` : ''}`;
  })
);

const logging = createLogger({
  level: logLevel,
  format: appFormat,
  transports: [
    new transports.Console(),
    // new transports.File({ filename: 'combined.log' }),
  ],
});

export default logging;
