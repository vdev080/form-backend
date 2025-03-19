require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 🔹 Allow CORS for all origins (For debugging)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🔹 Define User Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    number: String,
    pincode: String
});

const User = mongoose.model('User', userSchema, "users");

// 🔹 API Route to Save User Data
app.post('/api/save-user', async (req, res) => {
    const { firstName, lastName, email, number, pincode } = req.body;

    if (!firstName || !lastName || !email || !number || !pincode) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newUser = new User({ firstName, lastName, email, number, pincode });
        await newUser.save();
        res.json({ message: "✅ User saved successfully!" });
    } catch (error) {
        console.error("❌ Error saving user:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

// 🔹 Start Express Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
