import express, { Application, Request, Response } from "express";
import cors from 'cors';
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

// Parser
app.use(express.json());
app.use(express.text());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Shop is running',
  });
});

// Application Routes
// app.use('/api/blogs', BlogRoutes);
// Global Middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;
