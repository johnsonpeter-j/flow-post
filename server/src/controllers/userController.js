const User = require('../models/User');
const Department = require('../models/Department');
const { sendEmail } = require('../utils/sendEmail');
const { getEmailTemplate, getEmailTemplateText, TEMPLATE_IDS } = require('../utils/emailTemplates');
const generateToken = require('../utils/generateToken');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('departmentId', 'name')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('departmentId', 'name')
      .populate('createdBy', 'name email');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new user (invitation)
// @route   POST /api/users
// @access  Private
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, departmentId } = req.body;
    const createdBy = req.userId; // From auth middleware

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email',
      });
    }

    // Validate department if provided
    if (departmentId) {
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(400).json({
          success: false,
          error: 'Department not found',
        });
      }
    }

    // Create user without password (they'll set it during signup)
    const user = await User.create({
      name,
      email,
      departmentId: departmentId || null,
      createdBy,
      invitedOn: Date.now(),
    });

    // Generate invitation token (valid for signup)
    const invitationToken = generateToken(user._id);

    // Get CLIENT_URL from environment
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    // Get invitation email template
    const emailHtml = getEmailTemplate(TEMPLATE_IDS.USER_INVITATION, {
      userName: user.name,
      CLIENT_URL: clientUrl,
      invitation_token: invitationToken,
    });

    const emailText = getEmailTemplateText(TEMPLATE_IDS.USER_INVITATION, {
      userName: user.name,
      CLIENT_URL: clientUrl,
      invitation_token: invitationToken,
    });

    // Send invitation email
    try {
      await sendEmail({
        to: user.email,
        subject: 'You\'ve been invited to join Flow Post',
        html: emailHtml,
        text: emailText,
      });
    } catch (emailError) {
      console.error('Failed to send invitation email:', emailError);
      // Continue even if email fails - user is still created
    }

    await user.populate('departmentId', 'name');
    await user.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: user,
      message: 'User created and invitation email sent',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, departmentId } = req.body;

    // Validate department if provided
    if (departmentId) {
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(400).json({
          success: false,
          error: 'Department not found',
        });
      }
    }

    const updateData = {
      lastEditedAt: Date.now(),
    };

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (departmentId !== undefined) updateData.departmentId = departmentId || null;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .select('-password')
      .populate('departmentId', 'name')
      .populate('createdBy', 'name email');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


