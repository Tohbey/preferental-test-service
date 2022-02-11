const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const contactSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true
        },
        twitter: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
)

const books = new mongoose.Schema(
    {
        book: {
            type: objectId,
            required: true,
            ref: 'Book'
        },
        availableCopies: {
            type: Number,
            required: true,
            min: 0
        }
    }
)

const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 100,
            required: true
        },
        status: {
            type: String,
            default: 'not-approved',
            enum: ["approved", "not-approved", "disapproved"],
            required: true
        },
        address: {
            type: String,
            required: true
        },
        storeKeeper: {
            type: objectId,
            required: true,
            ref: 'User'
        },
        contactDetail: contactSchema,
        description: {
            type: String,
            required: true
        },
        books: [books]
    },
    {
        timestamps: true,
    }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
