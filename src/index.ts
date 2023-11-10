import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from './config/env';
import { Context, Logger } from './utils/logger';
import { dbConnection } from './config/database';
import routes from './routes';

const logger = new Logger(Context.SERVER);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

const port = env.port || 2000;

app.listen(port, async () => {
  await dbConnection();
  logger.info(`Server running on port ${port}`);
});
