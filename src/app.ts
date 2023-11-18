import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/student', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  const helloWorld = "'Hello World!'";
  res.send(helloWorld);
};

app.get('/', getAController);

export default app;
