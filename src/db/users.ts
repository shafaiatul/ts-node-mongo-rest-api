// Import mongoose, a tool that helps us talk to the MongoDB database
import mongoose from 'mongoose';

// -----------------------------
// USER SETUP: Define what a User looks like
// -----------------------------

// Create a "blueprint" for a User (called a Schema)
const UserSchema = new mongoose.Schema({
  // Every user must have an email (and it must be a string)
  email: { type: String, required: true },

  // Every user must have a username (and it must be a string)
  username: { type: String, required: true },

  // The user's authentication details
  authentication: {
    // The password (hidden from normal database queries for security)
    password: { type: String, required: true, select: false },

    // A random value added to passwords to make them more secure
    salt: { type: String, select: false },

    // A special token created when a user logs in (also hidden)
    sessionToken: { type: String, select: false },
  },
});

// Create a User model that allows us to create, read, update, and delete users in the database
export const UserModel = mongoose.model('User', UserSchema);

// -----------------------------
// USER ACTIONS: Functions to interact with the User data
// -----------------------------

// Get a list of all users from the database
export const getUsers = () => UserModel.find();

// Find a single user based on their email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Find a user based on their session token (used to check if a user is logged in)
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });

// Find a user based on their unique ID
export const getUserById = (id: string) => UserModel.findById(id);

// Create a new user in the database with the provided information
export const createUser = (values: Record<string, any>) => 
  new UserModel(values) // Create a new user object
    .save()             // Save the user to the database
    .then((user) => user.toObject()); // Convert the result into a simple object

// Delete a user from the database by their ID
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

// Update an existing user's information based on their ID
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
