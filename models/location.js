const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    coverImage: {
        type: Buffer, 
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    info: {
        about: {
            type: String,
            required: true
        },
        image: {
            type: Buffer, 
            required: true
        },
        imageType: {
            type: String,
            required: true
        },
        travelAdvice: {
            bestTimeToVisit: [String],
            localCustoms: {
                headings: [String],
                content: [String]
            },
        },
        tourVideo: {
            type: String,
            required: true
        },
        tours: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tour'
        }],
    },
});

locationSchema.virtual('coverImagePath').get(function() {
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
    }
});
locationSchema.virtual('imagePath').get(function() {
    if(this.info.image != null && this.info.imageType != null) {
        return `data:${this.info.imageType};charset=utf-8;base64,${this.info.image.toString('base64')}`;
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;