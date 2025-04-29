// Import express (framework to handle web requests)
import express from 'express';

// Import helper functions to interact with database (users) and create authentication data
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

// Controller function for logging in users
export const login = async (req: express.Request, res: express.Response) => {
  try {
    // Get the email and password sent by the user in the request
    const { email, password } = req.body;

    // If email or password is missing, send a "Bad Request" response
    if (!email || !password) {
      return res.sendStatus(400);
    }

    // Try to find the user in the database by their email
    // Also, get the hidden fields (salt and password) used for verifying login
    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    // If the user doesn't exist, send a "Bad Request" response
    if (!user) {
      return res.sendStatus(400);
    }

    // Use the user's salt and the password they entered to recreate the password hash
    const expectedHash = authentication(user.authentication.salt, password);
    
    // Compare the recreated hash with the one stored in the database
    if (user.authentication.password != expectedHash) {
      // If they don't match, send a "Forbidden" response (wrong password)
      return res.sendStatus(403);
    }

    // If the login is successful:
    // Generate a new random salt
    const salt = random();
    // Create a new session token using the salt and user's ID
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    // Save the updated user data (with session token) in the database
    await user.save();

    // Set a cookie in the user's browser to keep them logged in
    res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    // Send back the user data and a success response
    return res.status(200).json(user).end();
  } catch (error) {
    // If any unexpected error happens, log it and send a "Bad Request" response
    console.log(error);
    return res.sendStatus(400);
  }
};

// Controller function for registering (signing up) new users
export const register = async (req: express.Request, res: express.Response) => {
  try {
    // Get the email, password, and username sent by the user in the request
    const { email, password, username } = req.body;

    // If any required field is missing, send a "Bad Request" response
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
      // If user already exists, send a "Bad Request" response
      return res.sendStatus(400);
    }

    // Create a random salt for this new user
    const salt = random();
    // Create the user in the database, storing the salt and the hashed password
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Send back the created user data and a success response
    return res.status(200).json(user).end();
  } catch (error) {
    // If any unexpected error happens, log it and send a "Bad Request" response
    console.log(error);
    return res.sendStatus(400);
  }
}
