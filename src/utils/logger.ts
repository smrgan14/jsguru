import * as winston from 'winston';
import env from '../config/env';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'white',
  http: 'magenta',
};

export enum Context {
  SERVER = 'SERVER',
  USER = 'USER',
  PRODUCT = 'PrODUCT',
}

winston.addColors(colors);

const getLevel = () => {
  const environment = env.nodeEnv || 'development';
  return environment === 'development' ? 'debug' : 'warn';
};

export class Logger {
  private logger: winston.Logger;

  private context: string;

  constructor(context: string) {
    this.context = context;
    const logger = winston.createLogger({
      levels,
      level: getLevel(),
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.label({
          label: this.context,
        }),
        winston.format.timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
          (info) => `${info.level}: ${info.label}: ${[info.timestamp]}: ${
            info.message
          } ${
            info.suportingData
              ? JSON.stringify(info.suportingData)
              : ''
          }`,
        ),
      ),
    });
    this.logger = logger;
  }

  public info(message: string, suportingData?: any) {
    this.logger.info(message, {
      suportingData,
    });
  }

  public debug(message: string, suportingData?: any) {
    this.logger.debug(message, {
      suportingData,
    });
  }

  public warn(message: string, suportingData?: any) {
    this.logger.warn(message, {
      suportingData,
    });
  }

  public error(message: string, suportingData?: any) {
    this.logger.error(message, {
      suportingData,
    });
  }
}
