const { parse } = require("dotenv");
const Product = require("../models/productModels");
const APIFeatures = require("./../utils/apiFeature");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");




exports.aliasTopProduct = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratings';
  req.query.fields = 'name,price,ratingsAverage';
  next();
};

exports.getAllProduct = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const products = await features.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {message: products},
  });
})


exports.createProduct = catchAsync(async (req, res, next) => {

    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: {message: newProduct},
    });
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const docs = await Product.findByIdAndDelete(req.params.id);

  if (!docs){
    return next(new AppError('Document was not found', 404))
  }

res.status(200).json({
  status: "success, data was deleted",

});
});


exports.getProduct = catchAsync(async (req, res, next) => {
  const docs = await Product.findById(req.params.id)
  .populate('reviews');

  if (!docs){
    return next(new AppError('Document was not found', 404))
  }

res.status(200).json({
  status: "success",
  data: {message: docs}
});
})



exports.updateProduct = catchAsync(async (req, res, next) => {
    const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product){
      return next(new AppError('Product was not found', 404))
    }

  res.status(200).json({
    status: "success",
    data: {update}
  });
});






exports.getProductStats = catchAsync(async (req, res, next) => {
    const stats = await Product.aggregate([
      {
        $match: { ratings: { $gte: 3 } }
      },
      {
        $group: {
          _id: { $toUpper: '$product' },
          numProduct: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratings' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { $price: 1 }
      }
    ])
    res.status(200).json({
      status: 'success',
      data: {stats}
    });
});