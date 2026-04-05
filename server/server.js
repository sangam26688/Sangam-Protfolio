const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

// 🔥 FORCE LOAD .env (Isse undefined wala error fix ho jayega)
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// 🔍 DEBUGGING: Terminal mein check karne ke liye (Sab sahi raha toh ye 'FOUND' dikhayega)
console.log("------------------------------------");
console.log("Checking Environment Variables...");
console.log("Mongo URI:", process.env.MONGODB_URI ? "✅ FOUND" : "❌ NOT FOUND");
console.log("Email User:", process.env.EMAIL_USER ? "✅ FOUND" : "❌ NOT FOUND");
console.log("------------------------------------");

// ✅ 1. Middleware Settings
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// ✅ 2. MongoDB Connection
if (!process.env.MONGODB_URI) {
    console.error("❌ ERROR: MONGODB_URI is not defined in .env file!");
} else {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err));
}

// ✅ 3. Database Schemas
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    tech: [String],
    liveLink: String,
    githubLink: String,
    image: String
});
const Project = mongoose.model('Project', projectSchema);

// ✅ 4. Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
});

// Verify Email Connection
transporter.verify((error) => {
    if (error) {
        console.log("❌ Nodemailer Error (Check App Password):", error.message);
    } else {
        console.log("✅ Nodemailer is ready to send emails");
    }
});

// ✅ 5. Routes

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
            html: `<h3>New Contact Message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent & saved!' });
    } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ success: false, message: 'Process failed' });
    }
});

// ✅ 6. Production Setup
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});