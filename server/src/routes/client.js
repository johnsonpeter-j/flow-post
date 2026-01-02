const express = require('express');
const { body } = require('express-validator');
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');
const validateRequest = require('../middleware/validateRequest');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules for creating client
const createClientValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('businessType')
    .trim()
    .notEmpty()
    .withMessage('Business type is required'),
  body('mail')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('phone')
    .optional()
    .trim(),
  body('description')
    .optional()
    .trim(),
  body('brandColor')
    .optional()
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please provide a valid hex color code'),
];

// Validation rules for updating client
const updateClientValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('businessType')
    .optional()
    .trim(),
  body('mail')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('phone')
    .optional()
    .trim(),
  body('description')
    .optional()
    .trim(),
  body('brandColor')
    .optional()
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please provide a valid hex color code'),
];

// All routes require authentication
router.use(verifyToken);

// Routes
router.get('/', getClients);
router.get('/:id', getClient);
router.post(
  '/',
  createClientValidation,
  validateRequest,
  createClient
);
router.put(
  '/:id',
  updateClientValidation,
  validateRequest,
  updateClient
);
router.delete('/:id', deleteClient);

module.exports = router;

