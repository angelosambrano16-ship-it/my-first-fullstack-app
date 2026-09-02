const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 1. Swapped 'fs' for mongoose!

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

// 2. CONNECT TO MONGODB (Paste YOUR copied connection string inside the quotes below!)
const MONGO_URI = "mongodb+srv://angelosambrano16:pTPuQWn1JdrKFq3N@cluster0.vmzjohj.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("🔌 Successfully connected to MongoDB Cloud Database!"))
    .catch(err => console.error("❌ Database connection error:", err));

// 3. DEFINE DATA STRUCTURE SCHEMA
const UserSchema = new mongoose.Schema({
    name: String,
    role: String
});

const User = mongoose.model('User', UserSchema);

// Friendly home page message
app.get('/', (req, res) => {
    res.send("Welcome to my Live Database Server! Data is flowing to the cloud.");
});

// 4. GET ROUTE: Read data live out of MongoDB
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await User.find({}); // Fetches all documents from the cloud database
        res.json(allUsers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users from cloud database" });
    }
});

// 5. POST ROUTE: Receive and save new user objects PERMANENTLY
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body); // Grabs data from the input forms
        await newUser.save(); // Saves it directly into the cloud database forever!
        
        res.json({ message: "🎉 User saved permanently in MongoDB cloud!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Failed to save user data to cloud database" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Cloud-connected API Server running smoothly on port ${PORT}`);
});
