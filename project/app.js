const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crudRoutes = require('./routes/crud');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files

// Routes
app.use('/api', crudRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
