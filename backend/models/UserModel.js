const { Schema, model } = require('../connection');

const mySchema = new Schema ({ 
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Exclude password from query results by default
    },
    profilePicture: {
      type: String, // URL to the profile picture
      default: "default-profile.png",
    },
    coverPhoto: {
      type: String, // URL to the cover photo
      default: "default-cover.jpg",
    },
    bio: {
      type: String,
      maxlength: [160, "Bio must be at most 160 characters long"],
      default: "",
    },
    
    isAdmin: {
      type: Boolean,
      default: false, // Flag for admin users
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically create `createdAt` and `updatedAt`
    collection: "users", // Specify the collection name 
  });


// Ensure the model is not re-compiled on hot reloads
module.exports = model('users', mySchema);