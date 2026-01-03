const express = require('express');
const { body } = require('express-validator');
const {
  getContentBriefs,
  getContentBrief,
  createContentBrief,
  updateContentBrief,
  deleteContentBrief,
} = require('../controllers/contentBriefController');
const validateRequest = require('../middleware/validateRequest');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules for creating content brief
const createContentBriefValidation = [
  body('clientId')
    .notEmpty()
    .withMessage('Client ID is required')
    .isMongoId()
    .withMessage('Please provide a valid client ID'),
  body('concept')
    .optional()
    .trim(),
  body('explanation')
    .optional()
    .trim(),
  body('mood')
    .optional()
    .trim(),
  body('moodTags')
    .optional()
    .isArray()
    .withMessage('Mood tags must be an array'),
  body('contentType')
    .optional()
    .trim(),
  body('category')
    .optional()
    .isIn(['trending', 'general'])
    .withMessage('Category must be either "trending" or "general"'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'approved'])
    .withMessage('Status must be "pending", "in-progress", or "approved"'),
];

// Validation rules for updating content brief
const updateContentBriefValidation = [
  body('clientId')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid client ID'),
  body('category')
    .optional()
    .isIn(['trending', 'general'])
    .withMessage('Category must be either "trending" or "general"'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'approved'])
    .withMessage('Status must be "pending", "in-progress", or "approved"'),
];

// All routes require authentication
router.use(verifyToken);

// Routes
router.get('/', getContentBriefs);
router.get('/:id', getContentBrief);
router.post(
  '/',
  createContentBriefValidation,
  validateRequest,
  createContentBrief
);
router.put(
  '/:id',
  updateContentBriefValidation,
  validateRequest,
  updateContentBrief
);
router.delete('/:id', deleteContentBrief);

module.exports = router;


