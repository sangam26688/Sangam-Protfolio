const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

// .env load karne ka sahi tarika
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 1. Middleware Settings (Updated for Production)
const allowedOrigins = [
    "http://localhost:5173", 
    "https://sangam-protfolio-frontend.vercel.app" // 👈 Apna ASLI frontend URL yahan dalo
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// ✅ 2. MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Error:', err));

// ✅ 3. Database Schemas
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

const Project = mongoose.model('Project', new mongoose.Schema({
    title: String,
    description: String,
    tech: [String],
    liveLink: String,
    githubLink: String,
    image: String
}));

// ✅ 4. Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
});

// ✅ 5. Routes
app.get('/', (req, res) => {
    res.send("🚀 Server is running smoothly!");
});

// A. Get All Projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});

// B. Post Contact Message
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        const mailOptions = {
            from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, 
            subject: `🚀 New Message from ${name}`,
            html: `<h3>New Contact Message</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent & saved!' });
    } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ success: false, message: 'Process failed' });
    }
});

// Server Listen
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});