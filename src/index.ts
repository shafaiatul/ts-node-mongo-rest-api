// Importing required tools and libraries for the server
import express from 'express'; // The core framework to build our backend server
import http from 'http'; // Allows us to create the actual HTTP server
import bodyParser from 'body-parser'; // Helps read data sent by users in requests (like forms or JSON)
import cookieParser from 'cookie-parser'; // Helps read cookies from the user's browser
import compression from 'compression'; // Compresses responses to make them faster to load
import cors from 'cors'; // Allows our server to accept requests from other websites or apps (important for frontend/backend communication)

import router from './router'; // Imports our app’s routes (like page links but for backend)
import mongoose from 'mongoose'; // Library for connecting and working with our MongoDB database

// Create an Express app (our main server instance)
const app = express();

// Allow cross-origin requests (lets frontend talk to backend even if they're on different domains or ports)
app.use(cors({
  credentials: true, // Allow cookies and authentication headers to be sent
}));

// Use compression to make data sent to users smaller and faster
app.use(compression());

// Read cookies from the request (used for login/auth)
app.use(cookieParser());

// Read JSON data sent in requests (so we can access form submissions, etc.)
app.use(bodyParser.json());

// Create the actual HTTP server using our Express app
const server = http.createServer(app);

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

// Connection string (URI) for MongoDB – needs to be filled in
const MONGO_URL = ''; // Add your MongoDB connection string here

// Setup mongoose to use JavaScript promises
mongoose.Promise = Promise;

// Connect to MongoDB database
mongoose.connect(MONGO_URL);

// If there's an error connecting to the database, log it in the terminal
mongoose.connection.on('error', (error: Error) => console.log(error));

// Use our defined router for handling all routes (pages or API calls)
app.use('/', router());
