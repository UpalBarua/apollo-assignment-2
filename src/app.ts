import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './app/modules/user/user.routes';
import errorHandler from './app/middlewares/error-handler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(errorHandler);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'route not found',
  });
});

app.use('/api/users', userRoutes);

export default app;
