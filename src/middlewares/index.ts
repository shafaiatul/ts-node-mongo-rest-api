// Import express (to handle web requests) and lodash (a helper library for objects)
import express from 'express';
import { merge, get } from 'lodash';

// Import a function to get a user based on their session token
import { getUserBySessionToken } from '../db/users'; 

// Middleware: Checks if a user is authenticated (logged in)
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Get the session token (unique login ID) from the user's cookies
    const sessionToken = req.cookies['ANTONIO-AUTH'];

    // If there's no session token, block access (send "Forbidden" response)
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    // Try to find a user in the database who has this session token
    const existingUser = await getUserBySessionToken(sessionToken);

    // If no matching user is found, block access
    if (!existingUser) {
      return res.sendStatus(403);
    }

    // If user is found, attach their data to the request object (so other parts of the app can use it)
    merge(req, { identity: existingUser });

    // Move on to the next action
    return next();
  } catch (error) {
    // If anything goes wrong, log the error and send a "Bad Request" response
    console.log(error);
    return res.sendStatus(400);
  }
}

// Middleware: Checks if the logged-in user is the actual owner of a resource
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Get the id of the resource from the URL parameters (ex: /user/:id)
    const { id } = req.params;

    // Get the ID of the currently logged-in user (attached earlier in isAuthenticated)
    const currentUserId = get(req, 'identity._id') as string;

    // If there's no current user ID, send a "Bad Request" response
    if (!currentUserId) {
      return res.sendStatus(400);
    }

    // If the user's ID doesn't match the requested resource's ID, block access ("Forbidden")
    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    // If the IDs match, allow the user to continue
    next();
  } catch (error) {
    // If anything goes wrong, log the error and send a "Bad Request" response
    console.log(error);
    return res.sendStatus(400);
  }
}
