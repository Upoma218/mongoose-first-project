/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  const helloWorld = "'Hello World!'";
  res.send(helloWorld);
};

app.get('/', getAController);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
