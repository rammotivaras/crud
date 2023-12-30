const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3006;

// Enable CORS for all routes
app.use(cors());

// Serve your static files (optional)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Create a JSON server
const jsonServerRouter = jsonServer.router('db.json');
const jsonServerMiddlewares = jsonServer.defaults();

app.use('/api', jsonServerMiddlewares, jsonServerRouter);

// Start your server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
