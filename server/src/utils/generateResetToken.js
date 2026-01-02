const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for password reset
 * @param {string} userId - User ID
 * @returns {string} - JWT token
 */
const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.RESET_EXPIRY || '1h',
  });
};

module.exports = generateResetToken;


