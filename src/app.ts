import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './app/modules/user/user.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api/users', userRoutes);

export default app;
