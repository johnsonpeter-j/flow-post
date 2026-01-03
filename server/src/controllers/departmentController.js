const Department = require('../models/Department');
const User = require('../models/User');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: departments,
      count: departments.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all departments with users
// @route   GET /api/departments/with-users
// @access  Private
exports.getDepartmentsWithUsers = async (req, res, next) => {
  try {
    const departments = await Department.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    // Get users for each department
    const departmentsWithUsers = await Promise.all(
      departments.map(async (dept) => {
        const users = await User.find({ departmentId: dept._id })
          .select('_id name')
          .sort({ name: 1 });

        return {
          _id: dept._id,
          id: dept._id.toString(),
          name: dept.name,
          users: users.map((user) => ({
            _id: user._id,
            id: user._id.toString(),
            name: user.name,
          })),
        };
      })
    );

    res.status(200).json({
      success: true,
      data: departmentsWithUsers,
      count: departmentsWithUsers.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Private
exports.getDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found',
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Private
exports.createDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.userId; // From auth middleware

    const department = await Department.create({
      name,
      description: description || '',
      createdBy,
    });

    await department.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private
exports.updateDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description: description !== undefined ? description : undefined,
        lastEditedAt: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate('createdBy', 'name email');

    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found',
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private
exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Department not found',
      });
    }

    await Department.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


