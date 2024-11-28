const { Schema, model } = require('../connection');

const mySchema = new Schema({
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    caption: {
      type: String,
      maxlength: [500, "Caption cannot exceed 500 characters"],
    },
    image: {
      type: String, // URL for the post image
      required: [true, "Post image is required"],
    },
    likes: {
      type: Number,
      default: 0, // Number of likes
    },
    shares: {
      type: Number,
      default: 0, // Number of shares
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation time
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "Posted by user is required"],
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community", // Reference to the Community model
      required: [true, "Community is required"],
    },
  },
  {
    collection: "posts", // Name of the MongoDB collection
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Ensure the model is not re-compiled on hot reloads
module.exports = model('posts', mySchema);

