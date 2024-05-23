const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('../models/tour');

router.get('/', async(req, res) => {
    let query = Tour.find();
    if(req.query.tourLocation != null && req.query.tourLocation != '') {
        query = query.regex('tourLocation', new RegExp(req.query.tourLocation, 'i'));
    }
    try {
        // const tours = await Tour.find().exec();
        const tours = await query.exec();

        res.render('tours/index', { tours: tours });
    } catch(err) {
        res.redirect('/');
        console.error(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const tour = await Tour.findById(req.params.id).exec();
        res.render('tours/tour', { tour: tour });
    } catch(err) {
        console.log(err);
        // res.redirect('/');
    }
})

async function saveNewTour() {
    try{
        const coverImagePath = 'public/Images/sidebar/airlie-beach/to-do/beach-day-tour.jpg';

        fs.readFile(coverImagePath, async (err, coverImageData) => {
            if(err) {
                console.error("Error reading the file: ", err);
                return;
            }

            const newTour = new Tour({
                tourLocation: "Airlie beach",
                tourName: "Ocean Rafting Tour to Whitehaven Beach, Hill Inlet Lookout & Top Snorkel Spots",
                coverImage: coverImageData,
                coverImageType: 'image/jpeg',
                mapEmbedCode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.815010089348!2d148.70914037330243!3d-20.26650544661814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6bd835383a0ebb2b%3A0x747dd342a28b134f!2sCoral%20Sea%20Marina!5e0!3m2!1sen!2sin!4v1701541972834!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
                itinerary: [
                    "You'll start at: Coral Sea Marina",
                    "Whitsunday Islands",
                    "Ocean Rafting",
                    "Whitehaven Beach",
                    "Hill Inlet",
                    "You'll return to starting point",
                ],
                about: `Make the most of your time exploring the Whitsunday Islands' Whitehaven Beach aboard a motorized raft on this full-day tour. Choose between tours that offer a snorkeling expedition or extended beach time at secluded spots you wouldn't be able to access on your own. Listen to your naturalist guide talk about the flora and fauna of the area during nature walks and guided snorkeling expeditions (use of snorkel equipment is included). Afternoon tea and cake, as well as hotel pickup and drop-off, make this tour a convenient option.`,
                price: "₹10,816.38"
            });

            await newTour.save();

            console.log("Tour saved successfully");
        })
    } catch(err) {
        console.error("Error uploading tour: ", err);
    }
}
// saveNewTour();

module.exports = router;