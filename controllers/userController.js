const User = require('../models/userModels');
const catchAsync = require('./../utils/catchAsync');
const AppError = require ('./../utils/appError');



const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};



exports.getAllUsers = catchAsync(async(req, res, next) =>{
    const users = await User.find(req.query);

    res.status(200).json({
        status: "success",
        result: User.length,
        data: { users }
    })
})


//updating only specified user's data
exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.',400));
  }

  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});


//deleting user
exports.deleteMe = catchAsync(async (req, res, next) => {
  const docs = await User.findByIdAndDelete(req.params.id);

  if (!docs){
    return next(new AppError('Document was not found', 404))
  }

res.status(200).json({
  status: "success, data was deleted",

});
});


exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}




exports.getUser = catchAsync(async (req, res, next) => {
  let query = await User.findById(req.params.id);


  if (!query) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: query
    }
  });
});


exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.deleteUser = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
