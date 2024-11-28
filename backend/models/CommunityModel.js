const { Schema, model } = require('../connection');

const mySchema = new Schema({
    title: {
      type: String,
      required: [true, "Community title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    image: {
      type: String, // URL to the community's image
      required: [true, "Community image is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation time
    },
  },
  {
    collection: "communities", // Name of the MongoDB collection
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Ensure the model is not re-compiled on hot reloads
module.exports = model('community', mySchema);