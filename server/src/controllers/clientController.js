const Client = require('../models/Client');
const ContentBrief = require('../models/ContentBrief');
const IdeaBank = require('../models/IdeaBank');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
exports.getClients = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: clients,
      count: clients.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
exports.getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found',
      });
    }

    // Get all brief content for this client
    const contentBriefs = await ContentBrief.find({ clientId: req.params.id });
    
    // Get all idea bank items for this client
    const ideaBankItems = await IdeaBank.find({ clientId: req.params.id });
    
    // Get counts for idea bank
    const totalIdeaBankCount = ideaBankItems.length;
    const publishedIdeaBankCount = ideaBankItems.filter((item) => item.stage === 'posted').length;

    const totalBriefCount = contentBriefs.length;

    res.status(200).json({
      success: true,
      data: client,
      briefStats: {
        total: totalBriefCount,
        ready: 0,
        posted: 0,
      },
      ideaBankStats: {
        total: totalIdeaBankCount,
        published: publishedIdeaBankCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
exports.createClient = async (req, res, next) => {
  try {
    const { name, businessType, description, website, mail, phone, brandColor } = req.body;

    const client = await Client.create({
      name,
      businessType,
      description: description || '',
      website: website || '',
      mail,
      phone: phone || '',
      brandColor: brandColor || '#3B82F6',
    });

    res.status(201).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
exports.updateClient = async (req, res, next) => {
  try {
    let client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found',
      });
    }

    const { name, businessType, description, website, mail, phone, brandColor } = req.body;

    // Update fields
    if (name) client.name = name;
    if (businessType) client.businessType = businessType;
    if (description !== undefined) client.description = description;
    if (website !== undefined) client.website = website;
    if (mail) client.mail = mail;
    if (phone !== undefined) client.phone = phone;
    if (brandColor !== undefined) client.brandColor = brandColor;

    client.updatedAt = Date.now();
    await client.save();

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
exports.deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found',
      });
    }

    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

