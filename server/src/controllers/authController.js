const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const generateResetToken = require('../utils/generateResetToken');
const { sendEmail } = require('../utils/sendEmail');
const { getEmailTemplate, getEmailTemplateText, TEMPLATE_IDS } = require('../utils/emailTemplates');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, token } = req.body;

    // If token is provided, this is an invited user completing registration
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const userId = decoded.userId;

        // Find the invited user
        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({
            success: false,
            error: 'Invalid invitation token',
          });
        }

        // Check if user already has a password (already joined)
        if (user.password) {
          return res.status(400).json({
            success: false,
            error: 'User has already completed registration',
          });
        }

        // Validate password
        if (!password || password.length < 6) {
          return res.status(400).json({
            success: false,
            error: 'Password is required and must be at least 6 characters',
          });
        }

        // Update user with password and set joinedOn
        user.password = password;
        user.joinedOn = Date.now();
        // Update name and email if provided (in case they changed)
        if (name) user.name = name;
        if (email && email !== user.email) {
          // Check if new email is already taken
          const emailExists = await User.findOne({ email });
          if (emailExists) {
            return res.status(400).json({
              success: false,
              error: 'Email already exists',
            });
          }
          user.email = email;
        }
        await user.save();

        // Generate token
        const authToken = generateToken(user._id);

        res.status(200).json({
          success: true,
          data: {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
            token: authToken,
          },
        });
        return;
      } catch (tokenError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired invitation token',
        });
      }
    }

    // Regular signup (no token) - name and email are required
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required for registration',
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      joinedOn: Date.now(),
    });

    // Generate token
    const authToken = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: authToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Sign in user
// @route   POST /api/auth/signin
// @access  Public
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password',
      });
    }

    // Check for user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password - send reset email
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found with this email',
      });
    }

    // Generate reset token
    const resetToken = generateResetToken(user._id);

    // Get CLIENT_URL from environment
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    const resetExpiry = process.env.RESET_EXPIRY || '1 hour';

    // Get email template with replaced values
    const emailHtml = getEmailTemplate(TEMPLATE_IDS.RESET_PASSWORD, {
      userName: user.name,
      CLIENT_URL: clientUrl,
      jwt_token: resetToken,
      RESET_EXPIRY: resetExpiry,
    });

    // Get plain text version
    const emailText = getEmailTemplateText(TEMPLATE_IDS.RESET_PASSWORD, {
      userName: user.name,
      CLIENT_URL: clientUrl,
      jwt_token: resetToken,
      RESET_EXPIRY: resetExpiry,
    });

    // Send email
    await sendEmail({
      to: user.email,
      subject: 'Reset Your Password',
      html: emailHtml,
      text: emailText,
    });

    res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Private (requires valid JWT token)
exports.resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const userId = req.userId; // Set by verifyToken middleware

    // Validate password fields
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Password and confirm password are required',
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Passwords do not match',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters',
      });
    }

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Update password (will be automatically hashed by pre-save hook)
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify token and get current user
// @route   GET /api/auth/verify
// @access  Private (requires valid JWT token)
exports.verifyToken = async (req, res, next) => {
  try {
    const user = req.user; // Set by verifyTokenAndUser middleware

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

