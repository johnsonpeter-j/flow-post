const IdeaBank = require('../models/IdeaBank');

// @desc    Get all idea bank items
// @route   GET /api/idea-bank
// @access  Private
exports.getIdeaBankItems = async (req, res, next) => {
  try {
    const { clientId } = req.query;
    const query = clientId ? { clientId } : {};
    
    const ideaBankItems = await IdeaBank.find(query)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: ideaBankItems,
      count: ideaBankItems.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single idea bank item
// @route   GET /api/idea-bank/:id
// @access  Private
exports.getIdeaBankItem = async (req, res, next) => {
  try {
    const ideaBankItem = await IdeaBank.findById(req.params.id)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email');

    if (!ideaBankItem) {
      return res.status(404).json({
        success: false,
        error: 'Idea bank item not found',
      });
    }

    res.status(200).json({
      success: true,
      data: ideaBankItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new idea bank item
// @route   POST /api/idea-bank
// @access  Private
exports.createIdeaBankItem = async (req, res, next) => {
  try {
    const userId = req.userId; // From verifyToken middleware
    
    const ideaBankData = {
      ...req.body,
      createdBy: userId,
    };

    const ideaBankItem = await IdeaBank.create(ideaBankData);

    const populatedItem = await IdeaBank.findById(ideaBankItem._id)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: populatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update idea bank item
// @route   PUT /api/idea-bank/:id
// @access  Private
exports.updateIdeaBankItem = async (req, res, next) => {
  try {
    let ideaBankItem = await IdeaBank.findById(req.params.id);

    if (!ideaBankItem) {
      return res.status(404).json({
        success: false,
        error: 'Idea bank item not found',
      });
    }

    // Don't allow updating clientId or createdBy
    const { clientId, createdBy, ...updateData } = req.body;

    // Update fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        ideaBankItem[key] = updateData[key];
      }
    });

    ideaBankItem.updatedAt = Date.now();
    await ideaBankItem.save();

    const populatedItem = await IdeaBank.findById(ideaBankItem._id)
      .populate('clientId', 'name businessType')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: populatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete idea bank item
// @route   DELETE /api/idea-bank/:id
// @access  Private
exports.deleteIdeaBankItem = async (req, res, next) => {
  try {
    const ideaBankItem = await IdeaBank.findById(req.params.id);

    if (!ideaBankItem) {
      return res.status(404).json({
        success: false,
        error: 'Idea bank item not found',
      });
    }

    await IdeaBank.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
      message: 'Idea bank item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};


