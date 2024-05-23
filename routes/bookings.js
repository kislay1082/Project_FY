const express = require("express");
const router = express.Router();
const fs = require("fs");

const Hotels = require("../data/hotels.json");
const Flights = require("../data/flights.json");

router.get("/", async (req, res) => {
  try {
    const hotels = Hotels.Dubai;

    res.status(200).render("bookings/hotels", { hotels: hotels });
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

router.get("/flights", async(req, res) => {
  try {
    const flights = Flights.Dubai;
    res.status(200).render("bookings/flights", { flights: flights });
  } catch (error) {
    console.log(error);
  }
});

async function saveNewHotel() {
  const imagePath = "public/Images/booking/atlantis-the-palm.jpg";

  try {
    let image = await Promise.all([
      fs.readFile(imagePath, (err, data) => {
        if (err) throw err;
        image = data;
      }),
    ]);

    const newHotel = new Hotel({
      hotelName: "The Ritz-Carlton, Dubai",
      image: image,
      imageType: "image/jpeg",
      prices: {
        bestPrice: {
          source: "Booking.com",
          before: "1,18,903",
          after: "1,12,127",
        },
        otherPrices: {
          source: ["RitzCarlton.com", "Trip.com", "Agoda.com"],
          price: ["1,12,078", "1,18,903", "1,13,677"],
        },
      },
    });

    await newHotel.save();
    console.log("Hotel created and saved succesfully");
  } catch (err) {
    console.error("Error uploading hotel: ", err);
  }
}
// saveNewHotel();

module.exports = router;
