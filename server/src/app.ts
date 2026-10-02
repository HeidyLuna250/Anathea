// ═══════════════════════════════════════════
// ANATHEA — Express Application Setup
// ═══════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import anatomyRoutes from './routes/anatomy.routes';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Security & Utility Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ANATHEA API is running' });
});

// API Routes
app.use('/api/anatomy', anatomyRoutes);

// 404 Handler for undefined routes
app.use(notFoundHandler);

// Centralized Error Handling Middleware (must be registered last)
app.use(errorHandler);

export default app;
