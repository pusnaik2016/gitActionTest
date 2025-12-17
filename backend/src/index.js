const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const eventsRouter = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', eventsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve built frontend if present (useful for local production test)
const buildPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Serve index.html for non-API routes (SPA fallback)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') return next();
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Campus Events API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
