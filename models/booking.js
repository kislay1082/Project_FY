const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelLocation: {
        type: String,
        required:true
    },
    hotelName: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
    },
    imageType: {
        type: String,
    },
    prices: {
        bestPrice: {
            source: String,
            before: String,
            after: String
        },
        otherPrices: {
            source: [String],
            price: [String]
        }
    }
});

hotelSchema.virtual('imagePath').get(function() {
    if (this.image != null && this.imageType != null) {
        return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;