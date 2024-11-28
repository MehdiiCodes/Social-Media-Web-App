// Import required modules
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routers/UserRouter'); 
const postRoutes = require('./routers/PostRouter');


// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing


// Define routes
app.use('/users', userRoutes); // Routes for user management
app.use('/posts', postRoutes); // Routes for posts (like creating, deleting posts)

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
