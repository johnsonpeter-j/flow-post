/**
 * Email templates with identifiers
 */
const templates = {
  RESET_PASSWORD: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #000; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="border: 1px solid #e0e0e0; padding: 40px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="color: #000; margin-top: 0; font-weight: 600; font-size: 24px;">Reset Your Password</h2>
    <p style="margin: 20px 0;">Hi {{userName}},</p>
    <p style="margin: 20px 0;">You requested to reset your password. Click the button below to continue:</p>
    <div style="margin: 40px 0;">
      <a href="{{CLIENT_URL}}/reset-password?token={{jwt_token}}" 
         style="background-color: #000; color: #fff; padding: 14px 32px; text-decoration: none; display: inline-block; font-weight: 500; border-radius: 8px;">
        Reset Password
      </a>
    </div>
    <p style="color: #666; font-size: 14px; margin: 30px 0 10px 0;">Or copy this link:</p>
    <p style="background-color: #f5f5f5; padding: 12px; font-size: 13px; color: #666; word-break: break-all; border: 1px solid #e0e0e0; border-radius: 6px;">
      {{CLIENT_URL}}/reset-password?token={{jwt_token}}
    </p>
    <p style="color: #999; font-size: 13px; margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
      This link expires in {{RESET_EXPIRY}}. If you didn't request this, please ignore this email.
    </p>
  </div>
</body>
</html>`,
  USER_INVITATION: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #000; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="border: 1px solid #e0e0e0; padding: 40px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <h2 style="color: #000; margin-top: 0; font-weight: 600; font-size: 24px;">Welcome to Flow Post!</h2>
    <p style="margin: 20px 0;">Hi {{userName}},</p>
    <p style="margin: 20px 0;">You've been invited to join Flow Post. Click the button below to complete your registration and set up your account:</p>
    <div style="margin: 40px 0;">
      <a href="{{CLIENT_URL}}/signup?token={{invitation_token}}" 
         style="background-color: #000; color: #fff; padding: 14px 32px; text-decoration: none; display: inline-block; font-weight: 500; border-radius: 8px;">
        Complete Registration
      </a>
    </div>
    <p style="color: #666; font-size: 14px; margin: 30px 0 10px 0;">Or copy this link:</p>
    <p style="background-color: #f5f5f5; padding: 12px; font-size: 13px; color: #666; word-break: break-all; border: 1px solid #e0e0e0; border-radius: 6px;">
      {{CLIENT_URL}}/signup?token={{invitation_token}}
    </p>
    <p style="color: #999; font-size: 13px; margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
      If you didn't expect this invitation, please ignore this email.
    </p>
  </div>
</body>
</html>`,
};

/**
 * Get email template by identifier and replace placeholders with actual values
 * @param {string} templateId - Template identifier (e.g., 'RESET_PASSWORD')
 * @param {Object} values - Object containing key-value pairs to replace in template
 * @returns {string} - HTML content with replaced values
 */
const getEmailTemplate = (templateId, values = {}) => {
  // Check if template exists
  if (!templates[templateId]) {
    throw new Error(`Email template with identifier '${templateId}' not found`);
  }

  // Get the template
  let template = templates[templateId];

  // Replace all placeholders with actual values
  Object.keys(values).forEach((key) => {
    const placeholder = `{{${key}}}`;
    const value = values[key] || '';
    template = template.replace(new RegExp(placeholder, 'g'), value);
  });

  return template;
};

/**
 * Get plain text version of email template
 * @param {string} templateId - Template identifier
 * @param {Object} values - Object containing key-value pairs to replace
 * @returns {string} - Plain text content
 */
const getEmailTemplateText = (templateId, values = {}) => {
  // For now, return a simple text version
  // You can create separate text templates or strip HTML
  const html = getEmailTemplate(templateId, values);
  
  // Simple HTML to text conversion (basic)
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
};

module.exports = {
  getEmailTemplate,
  getEmailTemplateText,
  TEMPLATE_IDS: {
    RESET_PASSWORD: 'RESET_PASSWORD',
    USER_INVITATION: 'USER_INVITATION',
  },
};

