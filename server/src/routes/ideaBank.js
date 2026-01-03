const express = require('express');
const { body } = require('express-validator');
const {
  getIdeaBankItems,
  getIdeaBankItem,
  createIdeaBankItem,
  updateIdeaBankItem,
  deleteIdeaBankItem,
} = require('../controllers/ideaBankController');
const validateRequest = require('../middleware/validateRequest');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules for creating idea bank item
const createIdeaBankValidation = [
  body('clientId')
    .notEmpty()
    .withMessage('Client ID is required')
    .isMongoId()
    .withMessage('Please provide a valid client ID'),
  body('idea')
    .optional()
    .trim(),
  body('type')
    .optional()
    .trim(),
  body('stage')
    .optional()
    .trim(),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be "low", "medium", "high", or "urgent"'),
  body('platforms')
    .optional()
    .isArray()
    .withMessage('Platforms must be an array'),
];

// Validation rules for updating idea bank item
const updateIdeaBankValidation = [
  body('clientId')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid client ID'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be "low", "medium", "high", or "urgent"'),
  body('platforms')
    .optional()
    .isArray()
    .withMessage('Platforms must be an array'),
];

// All routes require authentication
router.use(verifyToken);

// Routes
router.get('/', getIdeaBankItems);
router.get('/:id', getIdeaBankItem);
router.post(
  '/',
  createIdeaBankValidation,
  validateRequest,
  createIdeaBankItem
);
router.put(
  '/:id',
  updateIdeaBankValidation,
  validateRequest,
  updateIdeaBankItem
);
router.delete('/:id', deleteIdeaBankItem);

module.exports = router;


