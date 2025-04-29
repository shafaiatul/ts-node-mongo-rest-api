import crypto from 'crypto'; // A built-in Node.js tool used to handle encryption and secure random values

// This is a secret string used as part of the password encryption process
const SECRET = 'ANTONIO-REST-API';

// This function is used to encrypt (securely scramble) a user's password using a unique salt
// - "salt" is a random string added to make the password more secure
// - "password" is the original password the user typed
export const authentication = (salt: string, password: string): string => {
  // Combine the salt and password, then encrypt it with a secret key
  // Returns an encrypted version of the password that can't be reversed
  return crypto.createHmac('sha256', [salt, password].join('/'))
               .update(SECRET)
               .digest('hex');
}

// This function generates a secure, random string — used to create things like a salt or session token
export const random = () => crypto.randomBytes(128).toString('base64');
