const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const bookSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            maxlength: 255,
            required: true
        },
        description: {
            type: String,
            index: true,
        },
        releaseDate: {
            type: String,
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
