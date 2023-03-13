const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');


//getting reviews
exports.getAllReview = catchAsync(async (req, res, next) => {
let filter = {};
if(req.params.productId) filter = {Product: req.params.productId};
const reviews = await Review.find(filter);

res.status(200).json({
    status: "success",
    data: { reviews }
});
});


//creating reviews
exports.createReview = catchAsync(async(req, res, next) =>{
    //Allow nested routes
    if(!req.body.product) req.body.Product = req.params.productId;
    if(!req.body.user) req.body.User = req.user.id;
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {newReview}
    })
})

exports.deleteReview = catchAsync(async (req, res, next) => {
    const docs = await Review.findByIdAndDelete(req.params.id);

    if (!docs){
      return next(new AppError('Document was not found', 404))
    }

  res.status(200).json({
    status: "success, data was deleted",

  });
});