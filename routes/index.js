const express = require("express");
const router = express.Router();
const fs = require("fs");

const Location = require("../models/location");
const Tour = require("../models/tour");

// Default route
router.get("/", async (req, res) => {
  let query = Location.find();
  if(req.query.locationName != null && req.query.locationName != '') {
    query = query.regex('locationName', new RegExp(req.query.locationName, 'i'));
  }
  try {
    const locations = await query.exec();
    // const locations = await Location.find().limit(4).exec();
    // console.log(locations[0].coverImage);
    // console.log(locations[0].imagePath);
    
    res.status(200).render("home/index", { locations: locations });
    // res.send(locations);
  } catch (err) {
    console.error(err);
    res.send("Error");
    // res.redirect('/');
  }
});

// Function to save new location info
async function saveNewLocation() {
  const coverImagePath = "public/Images/home-page-cards/aitlie-beach.jpg";
  const imagePath = "public/Images/sidebar/airlie-beach/airlie-beach.jpg";

  try {
    const newLocationName = "Airlie beach";

    let [coverImage, image] = await Promise.all([
      fs.readFile(coverImagePath, (err, data) => {
        if(err) throw err;
        coverImage = data;
      }),
      fs.readFile(imagePath, (err, data) => {
        if(err) throw err;
        image = data;
      }),
    ]);

    const tours = await Tour.find({ tourLocation: `${newLocationName}`}).limit(4).exec();

    const newLocation = new Location({
        locationName: "Airlie Beach, Australia",
        coverImage: coverImage,
        coverImageType: 'image/jpeg',
        info: {
            about: `The gateway to the Great Barrier Reef, Airlie Beach is the main hub for all Reef activities and access to the Whitsunday Islands. Stunning views by day give way to a vibrant nightlife. The Airlie Beach Lagoon is a popular spot to relax and unwind. Visit nearby Conway National Park and Cedar Creek Falls to discover quiet coves, beaches and tropical rainforest.`,
            image: image,
            imageType: 'image/jpeg',
            travelAdvice: {
                bestTimeToVisit: `Spring is the best time to visit, more specifically, the months of September to November because the weather is perfect and town is pumping.`,
                localCustoms: {
                    headings: ["No specific customs"],
                    content: [""]
                },
            },
            tourVideo: `<iframe width="560" height="315" src="https://www.youtube.com/embed/p569v1r0esA?si=EW0TiQIh0dkYYyTs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-full"></iframe>`,
          tours: [],
        },
    });

    tours.forEach((tour) => {
        newLocation.info.tours.push(tour._id);
    });

    await newLocation.save();
    console.log("Location created and saved succesfully");

  } catch (err) {
    console.error("Error uploading location: ", err);
  }
}
// saveNewLocation();

module.exports = router;
