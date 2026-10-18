const mongoose = require('mongoose');
const dotenv = require('dotenv');
// For vercel
const serverless = require('serverless-http');

dotenv.config({ path: './config.env' });

const app = require('./app');

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error(
    'Missing DATABASE or DATABASE_PASSWORD. Create Server/config.env (see your config backup).'
  );
  process.exit(1);
}

// DB connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });

// Local development server (Vercel sets VERCEL=1)
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}...`);
  });
}

// For vercel
module.exports = serverless(app);
