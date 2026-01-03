const express = require('express');
const { body } = require('express-validator');
const { signup, signin, forgotPassword, resetPassword, verifyToken: verifyTokenController, validateInvitation } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { verifyToken, verifyTokenAndUser } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const signupValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('token')
    .optional()
    .trim(),
];

const signinValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
];

const resetPasswordValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

// Routes
router.post('/signup', signupValidation, validateRequest, signup);
router.post('/signin', signinValidation, validateRequest, signin);
router.post('/forgot-password', forgotPasswordValidation, validateRequest, forgotPassword);
router.post('/reset-password', verifyToken, resetPasswordValidation, validateRequest, resetPassword);
router.get('/validate-invitation', validateInvitation);
router.get('/verify', verifyTokenAndUser, verifyTokenController);

module.exports = router;

