const ContentBrief = require('../models/ContentBrief');

// @desc    Get all content briefs
// @route   GET /api/content-briefs
// @access  Private
exports.getContentBriefs = async (req, res, next) => {
  try {
    const { clientId } = req.query;
    const query = clientId ? { clientId } : {};
    
    const contentBriefs = await ContentBrief.find(query)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email')
      .populate('teamsInvolved', 'name')
      .populate('notes.authorId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contentBriefs,
      count: contentBriefs.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single content brief
// @route   GET /api/content-briefs/:id
// @access  Private
exports.getContentBrief = async (req, res, next) => {
  try {
    const contentBrief = await ContentBrief.findById(req.params.id)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email')
      .populate('teamsInvolved', 'name')
      .populate('notes.authorId', 'name email');

    if (!contentBrief) {
      return res.status(404).json({
        success: false,
        error: 'Content brief not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contentBrief,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new content brief
// @route   POST /api/content-briefs
// @access  Private
exports.createContentBrief = async (req, res, next) => {
  try {
    const userId = req.userId; // From verifyToken middleware
    
    const contentBriefData = {
      ...req.body,
      createdBy: userId,
    };

    const contentBrief = await ContentBrief.create(contentBriefData);

    const populatedBrief = await ContentBrief.findById(contentBrief._id)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email')
      .populate('teamsInvolved', 'name');

    res.status(201).json({
      success: true,
      data: populatedBrief,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update content brief
// @route   PUT /api/content-briefs/:id
// @access  Private
exports.updateContentBrief = async (req, res, next) => {
  try {
    let contentBrief = await ContentBrief.findById(req.params.id);

    if (!contentBrief) {
      return res.status(404).json({
        success: false,
        error: 'Content brief not found',
      });
    }

    // Don't allow updating clientId or createdBy
    const { clientId, createdBy, ...updateData } = req.body;

    // Update fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        contentBrief[key] = updateData[key];
      }
    });

    contentBrief.updatedAt = Date.now();
    await contentBrief.save();

    const populatedBrief = await ContentBrief.findById(contentBrief._id)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email')
      .populate('teamsInvolved', 'name')
      .populate('notes.authorId', 'name email');

    res.status(200).json({
      success: true,
      data: populatedBrief,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete content brief
// @route   DELETE /api/content-briefs/:id
// @access  Private
exports.deleteContentBrief = async (req, res, next) => {
  try {
    const contentBrief = await ContentBrief.findById(req.params.id);

    if (!contentBrief) {
      return res.status(404).json({
        success: false,
        error: 'Content brief not found',
      });
    }

    await ContentBrief.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
      message: 'Content brief deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


