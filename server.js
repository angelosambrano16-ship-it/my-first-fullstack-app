const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

// FIXED CORE INFRASTRUCTURE LINE RIGHT HERE
app.use(express.static(__dirname));

// CONNECT TO MONGODB (Using your verified secure credentials)
const MONGO_URI = "mongodb+srv://angelosambrano16:pTPuQWn1JdrKFq3N@cluster0.vmzjohj.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("🔌 Successfully connected to MongoDB Cloud Database!"))
    .catch(err => console.error("❌ Database connection error:", err));

const UserSchema = new mongoose.Schema({
    name: String,
    role: String
});

const User = mongoose.model('User', UserSchema);

// Serves your index.html visual layout file directly on your root domain link
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET ROUTE: Read live database document entries out of the cloud
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await User.find({}); 
        res.json(allUsers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users from cloud database" });
    }
});

// POST ROUTE: Save data objects directly to your cloud clusters forever
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body); 
        await newUser.save(); 
        res.json({ message: "🎉 User saved permanently in MongoDB cloud!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: "Failed to save user data to cloud database" });
    }
});

app.listen(PORT, () => {
    console.log("🚀 Production Cloud Server running smoothly!");
});
