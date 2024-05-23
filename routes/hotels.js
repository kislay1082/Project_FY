const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route to get hotel suggestions based on query
router.get('/suggestions', async (req, res) => {
    const query = req.query.query.toLowerCase();
    if (!query) {
        return res.json([]);
    }

    try {
        const filePath = path.join(__dirname, '..', 'data', 'hotels.json');
        const jsonData = await fs.promises.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        const suggestions = data.Dubai
            .filter(hotel => hotel.name.toLowerCase().includes(query))
            .map(hotel => hotel.name);

        res.json(suggestions);
    } catch (err) {
        console.error('Error reading hotels data:', err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
