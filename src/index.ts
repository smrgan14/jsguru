import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
// eslint-disable-next-line import/no-extraneous-dependencies
import { rateLimit } from 'express-rate-limit';
import env from './config/env';
import { Context, Logger } from './utils/logger';
import { dbConnection } from './config/database';
import routes from './routes';

const logger = new Logger(Context.SERVER);

const app = express();

const limiter = rateLimit({
  windowMs: 10000,
  limit: 7,
  message: 'Limit of request reached (7 request in 10 sec)',
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

const port = env.port || 2000;

app.listen(port, async () => {
  await dbConnection();
  logger.info(`Server running on port ${port}`);
});
