import express from 'express';

import authentication from './authentication';
import users from './users';

const router = express.Router();

// This file combines all the individual route files into one central router
export default (): express.Router => {
  // Adds the authentication routes (register/login)
  authentication(router);

  // Adds the user-related routes (get, delete, update users)
  users(router);

  // Returns the combined router to be used in the main server file
  return router;
};
