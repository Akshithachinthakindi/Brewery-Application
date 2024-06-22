const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/Brewery', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define schema and model for reviews
const reviewSchema = new mongoose.Schema({
    breweryId: String,
    rating: Number,
    description: String
});
const Review = mongoose.model('Review', reviewSchema);

// Define schema and model for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose.model('User', userSchema);


//GET endpoint to fetch all reviews for a brewery
app.get('/api/breweries/:id/reviews', async (req, res) => {
    try {
        const breweryId = req.params.id;

        // Fetch reviews for the brewery from the database
        const reviews = await Review.find({ breweryId });

        res.json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST endpoint to add a new review for a brewery
app.post('/api/breweries/:id/reviews', async (req, res) => {
    try {
        const breweryId = req.params.id;
        const { rating, description } = req.body;

        // Create new review
        const newReview = new Review({ breweryId, rating, description });
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ error: 'Error adding review' });
    }
});

// API endpoint to register a new user
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newUser = new User({ name, email, password});
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
