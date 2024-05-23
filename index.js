// require('dotenv').config();
// const express = require('express');
// const app = express();
// const fs = require('fs').promises;
// const path = require('path');

// app.use(express.json());


// const indexRouter = require('./routes/index');
// const locationRouter = require('./routes/location');
// const tourRouter = require('./routes/tours');
// const bookingRouter = require('./routes/bookings');
// const registerRouter = require('./routes/register');

// app.set('view engine', 'pug');
// app.set('views', __dirname + "/src");

// app.use(express.static(__dirname + '/public'));
// app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRouter);
// app.use('/location', locationRouter);
// app.use('/tours', tourRouter);
// app.use('/bookings', bookingRouter);
// app.use('/register', registerRouter);

// const mongoose = require("mongoose");
// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(process.env.DATABASE_URL);
//     addDataFromJSON();
// }
// const db = mongoose.connection;
// db.once('open', () => console.log("Connected to MongoDB.."))

// app.listen(process.env.PORT || 3000, () => {
//     console.log("Server is listening on port" + (process.env.PORT || 3000));
// });

// async function addDataFromJSON() {
//     try {
//         // Read the JSON file
//         const filePath = path.join(__dirname, 'data', 'top_dest.json');
//         const jsonData = await fs.readFile(filePath, 'utf-8');
//         const data = JSON.parse(jsonData);

//         // Loop through each location in the JSON data
//         for (const locationData of data) {
//             // Create a new location document
//             const location = new Location({
//                 locationName: locationData.locationName,
//                 coverImage: locationData.coverImage,
//                 coverImageType: locationData.coverImageType,
//                 info: {
//                     about: locationData.info.about,
//                     image: locationData.info.image,
//                     imageType: locationData.info.imageType,
//                     travelAdvice: locationData.info.travelAdvice,
//                     tourVideo: locationData.info.tourVideo,
//                 }
//             });

//             // Save the location document to MongoDB
//             const savedLocation = await location.save();

//             // Loop through each tour in the location data
//             for (const tourData of locationData.info.tours) {
//                 // Create a new tour document
//                 const tour = new Tour({
//                     tourLocation: tourData.tourLocation,
//                     tourName: tourData.tourName,
//                     coverImage: tourData.coverImage,
//                     coverImageType: tourData.coverImageType,
//                     mapEmbedCode: tourData.mapEmbedCode,
//                     itinerary: tourData.itinerary,
//                     about: tourData.about,
//                     price: tourData.price
//                 });

//                 // Save the tour document to MongoDB and associate it with the location
//                 const savedTour = await tour.save();
//                 savedLocation.info.tours.push(savedTour);
//             }

//             // Save the updated location document with the associated tours
//             await savedLocation.save();
//         }

//         console.log('Data added successfully');
//     } catch (err) {
//         console.error('Error adding data:', err);
//     } finally {
//         // Close the MongoDB connection
//         mongoose.disconnect();
//     }
// }


require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs').promises;
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const path = require('path');
const mongoose = require("mongoose");
const Location = require('./models/location'); // Adjust the path as needed
const Tour = require('./models/tour'); // Adjust the path as needed
const flash = require('express-flash');
const sendEmail = require('./utils/sendEmail');
require('./passport-config'); 
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Connected to MongoDB..');
    // Uncomment the following line if you want to load data from JSON
    // addDataFromJSON();
})
.catch(err => console.error('Could not connect to MongoDB..', err));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret', // Keep secret in environment variable
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60 // Save session for 14 days
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000 // Cookie expiration: 14 days
    }
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());  

// Middleware to set user for views
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


// Import routes
const indexRouter = require('./routes/index');
const locationRouter = require('./routes/location');
const tourRouter = require('./routes/tours');
const bookingRouter = require('./routes/bookings');
const registerRouter = require('./routes/register');
const hotelsRouter = require('./routes/hotels');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const dashboardRouter = require('./routes/dashboard');
const planmanuallyRouter = require('./routes/planmanually')
const aitravelplannerRouter= require("./routes/aitravelplanner")
const itineraryRouter = require('./routes/itinerary');


// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src'));

// Route handling
app.use('/', indexRouter);
app.use('/location', locationRouter);
app.use('/tours', tourRouter);
app.use('/bookings', bookingRouter);
app.use('/register', registerRouter);
app.use('/hotels', hotelsRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/planmanually',planmanuallyRouter)
app.use('/aitravelplanner',aitravelplannerRouter)
app.use('/itinerary', itineraryRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});

// Function to load data from JSON and save to MongoDB
async function addDataFromJSON() {
    try {
        const filePath = path.join(__dirname, 'data', 'top_dest2.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        for (const locationData of Object.values(data).flat()) {
            // Read and convert coverImage and info.image to base64
            const coverImagePath = path.join(__dirname, 'public', locationData.coverImage);
            const coverImageBuffer = await fs.readFile(coverImagePath);
            locationData.coverImage = coverImageBuffer.toString('base64');

            const infoImagePath = path.join(__dirname, 'public', locationData.info.image);
            const infoImageBuffer = await fs.readFile(infoImagePath);
            locationData.info.image = infoImageBuffer.toString('base64');

            // Create a new Location document
            const location = new Location({
                locationName: locationData.locationName,
                coverImage: Buffer.from(locationData.coverImage, 'base64'),
                coverImageType: locationData.coverImageType,
                info: {
                    about: locationData.info.about,
                    image: Buffer.from(locationData.info.image, 'base64'),
                    imageType: locationData.info.imageType,
                    travelAdvice: locationData.info.travelAdvice,
                    tourVideo: locationData.info.tourVideo,
                    tours: []
                }
            });

            // Loop through each tour in the location data
            for (const tourData of locationData.info.tours) {
                const tourCoverImagePath = path.join(__dirname, 'public', tourData.coverImage);
                const tourCoverImageBuffer = await fs.readFile(tourCoverImagePath);
                tourData.coverImage = tourCoverImageBuffer.toString('base64');

                // Create a new Tour document
                const tour = new Tour({
                    tourLocation: tourData.tourLocation,
                    tourName: tourData.tourName,
                    coverImage: Buffer.from(tourData.coverImage, 'base64'),
                    coverImageType: tourData.coverImageType,
                    mapEmbedCode: tourData.mapEmbedCode,
                    itinerary: tourData.itinerary,
                    about: tourData.about,
                    price: tourData.price
                });

                // Save the tour document to MongoDB and associate it with the location
                const savedTour = await tour.save();
                location.info.tours.push(savedTour._id);
            }

            // Save the updated location document with the associated tours
            await location.save();
        }

        console.log('Data added successfully');
    } catch (err) {
        console.error('Error adding data:', err);
    } finally {
        mongoose.disconnect();
    }
}
