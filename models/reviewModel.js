const mongoose = require('mongoose');
const product = require('./productModels');
const Users = require('./userModels')


const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Please indicate the review']
    },
    rating: {
        type: Number,
        require: [true, 'Please indicate ratings'],
        min: [1, 'ratings must be above 1'],
        max: [5, 'ratings must be below 5']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    Product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: product,
        required: [true, 'Review must belong to a tour.']
      }],
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: [true, 'Review must belong to a user']
      }
    },
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Populate Product and user's details
reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'User',
        select: 'name'
    });
    next()
  })


const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review;