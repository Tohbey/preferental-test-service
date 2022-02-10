const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const expiry = process.env.expireIn;

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
            required: true,
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
            required: true,
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
                default: null,
            },
            resetPasswordExpires: {
                type: Date,
                default: null,
            },
        },
        role: {
            type: String,
            enum: ["admin", "user", "store_keeper", "author"],
            default: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        jwtSecret,
        { expiresIn: expiry }
    );

    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
