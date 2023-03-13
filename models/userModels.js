const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email address is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'suppliers', 'admin'],
        default: 'user'
    },

    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'confirm your password'],
        minlength: 8,
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: "password are not the same"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})


//convert password using bcrypt
userSchema.pre('save', async function(next){
    //convert password if not modified
    if (!this.isModified('password')) return (next);

    //convert password if modified
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
})

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });
  
userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.changePassword = function(JWTTimestap) {
    if(this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTimestap < changedTimeStamp;
    }
    return false;
};


userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() +10 *60 *1000;

    console.log({resetToken}, this.passwordResetToken);

    return resetToken;
};


const Users = mongoose.model('userList', userSchema)

module.exports = Users