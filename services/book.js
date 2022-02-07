const Book = require("../models/book");

class BookService {
    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    static getBooks(skip, pageSize, filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    // static getBooksByAuthor(author) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //         } catch (error) { }
    //     });
    // }

    static getBook(bookId) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    static updateBook(bookObject, authour, bookId) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    static deleteBook(bookId) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }
}


module.exports = BookService;