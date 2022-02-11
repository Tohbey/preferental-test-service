const Book = require("../models/book");
const { MSG_TYPES } = require("../constant/types");


class BookService {

    /**
        * Create book
        * @param {Object} body request body object
    */
    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const book = await Book.findOne({
                    author: body.author,
                    name: body.name,
                });

                if (book) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.EXIST });
                }

                const createBook = await Book.create(body);

                resolve(createBook);
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    
    /**
        * Get books
        * @param {Object} skip 
        * @param {Object} pageSize 
        * @param {Object} filter 
    */
    static getBooks(skip, pageSize, filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const books = await Book.find(filter).skip(skip).limit(pageSize);

                const total = await Book.find(filter).countDocuments();

                resolve({ books, total });
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }


    /**
        * Get book
        * @param {Object} filter
    */
    static getBook(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const book = await Book.findOne(filter).populate('author').select('-password -passwordRetrive -rememberToken');

                if (!book) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
                }

                resolve(book);
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }


    /**
        * Delete book
        * @param {Object} bookId
        * @param {Object} author
    */
    static deleteBook(bookId, author) {
        return new Promise(async (resolve, reject) => {
            try {
                const book = await Book.findOne({
                    _id: bookId,
                    author
                });

                if (!book) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
                }

                await book.delete();

                resolve({ msg: MSG_TYPES.DELETED });
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }
}


module.exports = BookService;