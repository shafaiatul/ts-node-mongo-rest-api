import express from 'express';
import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

// This file defines the routes related to user data management
export default (router: express.Router) => {
  // Get a list of all users — only allowed if the user is logged in
  router.get('/users', isAuthenticated, getAllUsers);

  // Delete a specific user by ID — only allowed if the user is logged in AND is the owner of that account
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);

  // Update a specific user's info — only allowed if the user is logged in AND is the owner
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
