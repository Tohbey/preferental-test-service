const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const bookSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            maxlength: 100,
            required: true
        },
        description: {
            type: String,
            maxlength: 225,
            index: true,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        book: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        author:{
            type: objectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
