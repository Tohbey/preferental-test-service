const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {   
        email: {
            type: String,
            index: true,
            required: true,
            lowercase: true,
        },
        name: {
            type: String,
            maxlength: 100,
            required: true
        },
        phoneNumber: {
            type: String,
            maxlength: 225,
            index: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["active", "suspended", "inactive"],
            default: "active",
            required: true
        },
        password: {
            type: String,
            maxlength: 600,
        },
        rememberToken: {
            token: {
              type: String,
              default: null,
            },
            expiredDate: {
              type: Date,
              default: null,
            },
        },
        passwordRetrive: {
            resetPasswordToken: {
              type: String,
              default: null
            },
            resetPasswordExpires: {
              type: Date,
              default: null
            }
        },
        role:{
            type: String,
            enum: ["admin", "user", "book_keeper", 'author'],
            default: "user",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
