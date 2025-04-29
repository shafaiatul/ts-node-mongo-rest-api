// Import express (to handle web requests)
import express from 'express';

// Import functions that deal with the database for users
import { deleteUserById, getUsers, getUserById } from '../db/users';

// Controller function: Get a list of all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    // Fetch all users from the database
    const users = await getUsers();

    // Return the list of users with a success status (200 OK)
    return res.status(200).json(users);
  } catch (error) {
    // If something goes wrong, log the error and send a "Bad Request" response
    console.log(error);
    return res.sendStatus(400);
  }
};

// Controller function: Delete a specific user
export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    // Get the user ID from the URL (ex: /user/123)
    const { id } = req.params;

    // Delete the user with this ID from the database
    const deletedUser = await deleteUserById(id);

    // Return the deleted user's data
    return res.json(deletedUser);
  } catch (error) {
    // If something goes wrong, log the error and send a "Bad Request" response
    console.log(error);
    return res.sendStatus(400);
  }
}

// Controller function: Update a user's information (only the username here)
export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    // Get the user ID from the URL
    const { id } = req.params;

    // Get the new username from the request body (what the client sent)
    const { username } = req.body;

    // If no username was provided, send a "Bad Request" response
    if (!username) {
      return res.sendStatus(400);
    }

    // Find the user in the database by their ID
    const user = await getUserById(id);
    
    // Update the user's username
    user.username = username;

    // Save the changes back to the database
    await user.save();

    // Return the updated user with a success status (200 OK)
    return res.status(200).json(user).end();
  } catch (error) {
    // If something goes wrong, log the error and send a "Bad Request" response
    console.log(error);
    return res.sendStatus(400);
  }
}
