const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Your personal details - REPLACE THESE
const USER_ID = "rathoreatri";
const EMAIL = "rathoreatri@gmail.com";
const ROLL_NUMBER = "your_roll_number";

// Root routeBAAI
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to BFHL API",
        endpoints: {
            get: "/bfhl",
            post: "/bfhl"
        }
    });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: data must be an array"
            });
        }

        // Process the data
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);

        // Find highest alphabet (case insensitive)
        const highest_alphabet = alphabets.length > 0
            ? [alphabets.reduce((max, current) =>
                max.toLowerCase() > current.toLowerCase() ? max : current
            )]
            : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});