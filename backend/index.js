// Import required modules
const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/UserRouter'); 
const postRouter = require('./routers/PostRouter');


// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing


// Define routes
app.use('/user', userRouter); // Routers for user management
app.use('/post', postRouter); // Routers for posts (like creating, deleting posts)

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
