const express = require('express');
const router = express.Router();
const Location = require('../models/location');
const Tour = require('../models/tour');

router.get('/', async (req, res) => {
    const searchQuery = req.query.locationName;

    let locationQuery = {};
    if (searchQuery) {
        locationQuery = {
            $or: [
                { 'locationName': { $regex: searchQuery, $options: 'i' } },
                { 'info.about': { $regex: searchQuery, $options: 'i' } },
                { 'info.tours.tourName': { $regex: searchQuery, $options: 'i' } },
                { 'info.tours.about': { $regex: searchQuery, $options: 'i' } }
            ]
        };
    }

    try {
        
        const locations = await Location.find(locationQuery).populate('info.tours').exec();
        const numLocations = locations.length;
        console.log(numLocations)
        res.render('home/location', { locations, searchQuery });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const fs = require('fs');

// const Location = require('../models/location');
// const Tour = require('../models/tour');

// router.get('/', async (req, res) => {
//     let query = Location.findOne().populate('info.tours');
//     const searchQuery = req.query.locationName;

//     if (searchQuery != null && searchQuery != '') {
//         query = Location.find({
//             $or: [
//                 { 'locationName': { $regex: searchQuery, $options: 'i' } },
//                 { 'info.about': { $regex: searchQuery, $options: 'i' } },
//                 { 'info.tours.tourName': { $regex: searchQuery, $options: 'i' } },
//                 { 'info.tours.about': { $regex: searchQuery, $options: 'i' } }
//             ]
//         }).populate('info.tours');
//     }

//     try {
//         const locations = await query.exec();
//         res.render('home/location', { locations: locations });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const fs = require('fs');

// const Location = require('../models/location');
// const Tour = require('../models/tour');


// router.get('/', async(req, res) => {
//     let query = Location.findOne().populate('info.tours');

//     if(req.query.locationName != null && req.query.locationName != '') {
//         query = query.regex('locationName', new RegExp(req.query.locationName, 'i'));
//     }
//     try {
//         const locationName = req.query.locationName;
//         const location = await query.exec();
//         // const location = await Location.findOne({ locationName: `${locationName}` }).populate('info.tours').exec();        

//         res.render('home/location', { location: location });
//     } catch (err) {
//         console.error(err);
//     }
// });

// module.exports = router;