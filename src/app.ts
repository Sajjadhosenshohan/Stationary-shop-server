import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from './app/config';
import { paymentRoutes } from './app/modules/PaymentMangement/payment.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://bookbazzar-online-ph-a4.vercel.app',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  }),
);
app.use(bodyParser.json());

// app.use('/order', orderRoutes);

// Test route
const test = async (req: Request, res: Response) => {
  res.send('BookBazaar server is running...');
};

app.get('/', test);
app.use('/api/v1', router);
app.use('/payment', paymentRoutes);

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
