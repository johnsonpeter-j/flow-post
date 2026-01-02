const express = require('express');
const { body } = require('express-validator');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const validateRequest = require('../middleware/validateRequest');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules for creating user
const createUserValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('departmentId')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid department ID'),
];

// Validation rules for updating user
const updateUserValidation = [
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
  body('departmentId')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid department ID'),
];

// All routes require authentication
router.use(verifyToken);

// Routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.post(
  '/',
  createUserValidation,
  validateRequest,
  createUser
);
router.put(
  '/:id',
  updateUserValidation,
  validateRequest,
  updateUser
);
router.delete('/:id', deleteUser);

module.exports = router;


