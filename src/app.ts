/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:5173'], credentials: true}));

app.use('/api/v1', router);

const test = async(req: Request, res: Response) => {

  const helloWorld = "'Hello World!'";
  res.send(helloWorld);
};

app.get('/', test);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
