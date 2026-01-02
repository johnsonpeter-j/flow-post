const nodemailer = require('nodemailer');

/**
 * Create reusable transporter object using SMTP transport
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

/**
 * Common function to send email
 * @param {Object} options - Email options
 * @param {string|Array} options.to - Recipient email address(es)
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content (optional if html is provided)
 * @param {string} options.html - HTML content (optional if text is provided)
 * @param {string} options.from - Sender email (optional, defaults to SMTP_USER)
 * @param {Array} options.attachments - Array of attachment objects (optional)
 * @param {string|Array} options.cc - CC email address(es) (optional)
 * @param {string|Array} options.bcc - BCC email address(es) (optional)
 * @param {string} options.replyTo - Reply-to email address (optional)
 * @returns {Promise} - Promise that resolves with email info or rejects with error
 */
const sendEmail = async (options) => {
  try {
    // Validate required fields
    if (!options.to) {
      throw new Error('Recipient email address is required');
    }
    if (!options.subject) {
      throw new Error('Email subject is required');
    }
    if (!options.text && !options.html) {
      throw new Error('Either text or html content is required');
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASSWORD in environment variables.');
    }

    // Create transporter
    const transporter = createTransporter();

    // Prepare mail options
    const mailOptions = {
      from: options.from || process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    // Add optional fields
    if (options.cc) {
      mailOptions.cc = options.cc;
    }
    if (options.bcc) {
      mailOptions.bcc = options.bcc;
    }
    if (options.replyTo) {
      mailOptions.replyTo = options.replyTo;
    }
    if (options.attachments && Array.isArray(options.attachments)) {
      mailOptions.attachments = options.attachments;
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

/**
 * Send a simple text email
 * @param {string|Array} to - Recipient email address(es)
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @returns {Promise}
 */
const sendTextEmail = async (to, subject, text) => {
  return sendEmail({
    to,
    subject,
    text,
  });
};

/**
 * Send an HTML email
 * @param {string|Array} to - Recipient email address(es)
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 * @param {string} text - Plain text fallback (optional)
 * @returns {Promise}
 */
const sendHtmlEmail = async (to, subject, html, text = null) => {
  return sendEmail({
    to,
    subject,
    html,
    text,
  });
};

module.exports = {
  sendEmail,
  sendTextEmail,
  sendHtmlEmail,
};


