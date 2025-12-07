const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const stripe = require('stripe');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5500/frontend';

const stripeClient = stripe(STRIPE_SECRET_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../frontend')); // Serve frontend for simplicity if needed, but requirements imply separate deployment logic.

const USERS_FILE = path.join(__dirname, 'users.json');

// Helper to read users
const getUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper to save users
const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Signup Route
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    users.push({ email, password }); // Storing plain text as requested for "simple" logic, in real app use bcrypt
    saveUsers(users);
    res.status(201).json({ message: 'User created successfully' });
});

// Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', email: user.email });
});

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Premium Subscription',
                        },
                        unit_amount: 2000, // $20.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${CLIENT_URL}/success.html`,
            cancel_url: `${CLIENT_URL}/dashboard.html`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
