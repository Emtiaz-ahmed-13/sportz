const express = require('express');
const matchRouter = require('./src/routes/matches');

const app = express();
const PORT = process.env.PORT || 8000;

// JSON middleware
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Sportz API!' });
});

// Routes
app.use('/api/matches', matchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
