const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
    tourLocation: {
        type: String,
        required: true
    },
    tourName: {
        type: String,
        required: true,
    },
    coverImage: {
        type: Buffer,
        required: true,
    },
    coverImageType: {
        type: String,
        required: true,
    },
    mapEmbedCode: {
        type: String,
        required: true,
    },
    itinerary: {
        type: [String],
    },
    about: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
});

toursSchema.virtual('coverImagePath').get(function() {
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
    }
});

const Tour = mongoose.model('Tour', toursSchema);
module.exports = Tour;