const mongoose = require('mongoose');
const Users = require('./userModels');
// const Reviews = require('./reviewModel');


const productSchema = new mongoose.Schema({
    product: {
            type: String,
            name: [true, 'Product name is required'],
            trim: true,
            unique: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A product must have a description']
    },
    shortDescription: {
        type: String,
        trim: true,
        required: [true, 'A product must have a short description']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating Average must be above 1.0'],
        max: [5, 'Rating Average must be below 5.0']

    },
    ratingsQuantity: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating quantity must be above 1.0'],
        max: [5, 'Rating quantity must be below 5.0']

    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Products quantity must be 1 or more'],
        max: [9999, 'You have reached maximum quantity']
    },
    ratings: {
        type: Number,
        default: 4,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    },
    imageCover: {
    type: String,
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: [true, 'Please indicate suppliers name']
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});


//virtual populate the product reviews on GET products
productSchema.virtual('reviews', {
ref: 'Reviews',
foreignField: 'Product',
localField: '_id'

});


//populate suppliers details
productSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'supplier',
      select: ['name', 'email']
    })
    next()
  });



const product = mongoose.model('ProductList', productSchema);

module.exports = product;