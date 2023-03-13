const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");


const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get('/me', authController.protect, userController.getMe, userController.getUser);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

router.patch("/updatepassword", authController.protect, authController.updatePassword);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);


router
  .route("/")
  .get(userController.getAllUsers)
  .post(authController.protect, authController.restrictTo('admin'),userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser)




module.exports = router;
