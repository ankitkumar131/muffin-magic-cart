/**
 * This script fixes the JWT token generation issue by directly modifying the user model file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to user model file
const userModelPath = path.join(__dirname, 'src', 'models', 'user.model.js');

console.log('🔧 Fixing JWT token generation issue...');

// Read the user model file
let userModelContent = fs.readFileSync(userModelPath, 'utf8');

// Add hardcoded JWT secrets at the top of the file
if (!userModelContent.includes('// Hardcoded JWT secrets')) {
  userModelContent = userModelContent.replace(
    'import {',
    `// Hardcoded JWT secrets for development
const JWT_SECRET = "muffin_magic_secret_key_2025";
const JWT_EXPIRY = "7d";

import {`
  );
}

// Update the generateAccessToken method to use hardcoded secrets
userModelContent = userModelContent.replace(
  /generateAccessToken\(\) {[\s\S]*?process\.env\.ACCESS_TOKEN_SECRET,[\s\S]*?process\.env\.ACCESS_TOKEN_EXPIRY[\s\S]*?},/,
  `generateAccessToken() {
        return jwt.sign(
          {
            _id: this._id,
            email: this.email,
            userRole: this.userRole,
          },
          // Use hardcoded secret instead of environment variable
          JWT_SECRET,
          { expiresIn: JWT_EXPIRY },
        );
      },`
);

// Write the updated content back to the file
fs.writeFileSync(userModelPath, userModelContent);

console.log('✅ JWT token generation issue fixed!');
console.log('🚀 Restart the backend server to apply the changes.');
