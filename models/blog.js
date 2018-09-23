const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let titleLenghtChecker = (title) => {
    if (!title) {
        return false;
    } else {
        if (title.length < 5 || title.length > 50) {
            return false;
        } else {
            return true;
        }
    }
}

let alphaNumericTitleChecker = (title) => {
    if (!title) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(title);
    }
}

const tittleValidators = [
    {
        validator: titleLenghtChecker, message: 'title must be at least 5 characters but no more than 50'
    },
    {
        validator: alphaNumericTitleChecker, message: 'Title must be alphanumeric'
    }
];

// Validate Function to check username length
let bodyLengthChecker = (body) => {
    // Check if username exists
    if (!body) {
        return false; // Return error
    } else {
        // Check length of username string
        if (body.length < 5 || body.length > 500) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid username
        }
    }
};

// Array of Username validators
const bodyValidators = [
    // First Username validator
    {
        validator: bodyLengthChecker,
        message: 'blog body must be at least 5 characters but no more than 500'
    }
];

// Validate Function to check password length
let commentLengthChecker = (comment) => {
    // Check if password exists
    if (!comment[0]) {
        return false; // Return error
    } else {
        // Check password length
        if (comment.length[0] < 1 || comment.length[0] > 200) {
            return false; // Return error if passord length requirement is not met
        } else {
            return true; // Return password as valid
        }
    }
};



// Array of comment validators
const commentValidators = [
    // First password validator
    {
        validator: commentLengthChecker,
        message: 'comments may not exceed 200 characters'
    }
];

const blogSchema = new Schema({
    title: { type: String, required: true, validate: tittleValidators },
    body: { type: String, required: true, validate: bodyValidators },
    createdBy: { type: String, required: true },
    createdAt: { type: Number, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array },
    comments: [
        {
            comment: { type: String, validate: commentValidators },
            commentator: { type: String }
        }
    ]
});


// userSchema.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }

module.exports = mongoose.model('Blog', blogSchema);
