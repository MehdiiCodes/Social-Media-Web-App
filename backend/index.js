// Import required modules
const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/userRouter');
const PostRouter = require('./routers/postRouter');
const CommunityRouter = require('./routers/communityRouter');


// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing


// Define routes
app.use('/user', UserRouter); // Routers for user management
app.use('/post', PostRouter); // Routers for posts (like creating, deleting posts)
app.use('/community', CommunityRouter);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
