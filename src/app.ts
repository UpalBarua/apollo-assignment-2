import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './app/middlewares/error-handler';
import userRoutes from './app/modules/user/user.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api/users', userRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found. Please check the URL and try again.',
  });
});

app.use(errorHandler);

export default app;
