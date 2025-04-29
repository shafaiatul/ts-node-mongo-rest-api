import express from 'express';
import { login, register } from '../controllers/authentication';

// This file defines the routes for user authentication (signup and login)
export default (router: express.Router) => {
  // When someone sends a POST request to /auth/register (like filling out a signup form), run the "register" function
  router.post('/auth/register', register);

  // When someone sends a POST request to /auth/login (like logging in), run the "login" function
  router.post('/auth/login', login);
};
