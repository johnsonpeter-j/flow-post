const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client profile upload directory
const clientUploadPath = process.env.CLIENT_PROFILE_UPLOAD_PATH || path.join(__dirname, '../uploads/clients');
app.use('/uploads', express.static(clientUploadPath));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/client'));
app.use('/api/departments', require('./routes/department'));
app.use('/api/users', require('./routes/user'));
app.use('/api/content-briefs', require('./routes/contentBrief'));
app.use('/api/idea-bank', require('./routes/ideaBank'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

