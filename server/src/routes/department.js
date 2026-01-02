const express = require('express');
const { body } = require('express-validator');
const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departmentController');
const validateRequest = require('../middleware/validateRequest');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules for creating department
const createDepartmentValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('description')
    .optional()
    .trim(),
];

// Validation rules for updating department
const updateDepartmentValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('description')
    .optional()
    .trim(),
];

// All routes require authentication
router.use(verifyToken);

// Routes
router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.post(
  '/',
  createDepartmentValidation,
  validateRequest,
  createDepartment
);
router.put(
  '/:id',
  updateDepartmentValidation,
  validateRequest,
  updateDepartment
);
router.delete('/:id', deleteDepartment);

module.exports = router;


