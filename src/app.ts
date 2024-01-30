import cors from 'cors';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import router from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Mongo connected'))
  .catch((error: Error) => console.log(error));

app.use('/api', router());
export default app