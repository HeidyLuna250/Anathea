import 'dotenv/config';
import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`🧬 ANATHEA Server is running on port ${PORT}`);
});
