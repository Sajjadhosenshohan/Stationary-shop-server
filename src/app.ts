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
app.use(express.text());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'https://stationary-shop-client.vercel.app',
    ],
    credentials: true, // Allow cookies and authorization headers
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  }),
);
app.use(bodyParser.json());

const test = async (req: Request, res: Response) => {
  res.send('Stationary server is running...');
};

app.get('/', test);
app.use('/api/v1', router);
app.use('/payment', paymentRoutes);

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
