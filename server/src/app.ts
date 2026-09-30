// ═══════════════════════════════════════════
// ANATHEA — Express Application Setup
// ═══════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import anatomyRoutes from './routes/anatomy.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ANATHEA API is running' });
});

// API Routes
app.use('/api/anatomy', anatomyRoutes);

// To do: Error handling middleware will be added here

export default app;
