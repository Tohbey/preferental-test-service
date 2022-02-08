const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateBook } = require("../request/book");
const BookService = require("../services/book");

/** 
 * Create Book
 * @param {*} req
 * @param {*} res
*/
exports.createBook= async (req, res, next) => {
    try {
        req.body.author = req.user._id;

        const { error } = validateBook(req.body);
        if (error) return JsonResponse(res, 400, error.details[0]);

        let newBook = await BookService.create(req.body);

        JsonResponse(res, 201, MSG_TYPES.CREATED, newBook);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


/** 
 * get Books
 * @param {*} req
 * @param {*} res
*/
exports.getBooks = async (req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);

        const { books, total } = await BookService.getBooks(skip, pageSize)

        const meta = {
            total,
            pagination: { pageSize, page }
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED, books, meta);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


/** 
 * get Books by author 
 * @param {*} req
 * @param {*} res
*/
exports.getBooksByAuthor = async (req, res, next) => {
    try {
        let filter = {
            author: req.user._id
        };

        const { page, pageSize, skip } = paginate(req);

        const { books, total } = await BookService.getBooks(skip, pageSize, filter)

        const meta = {
            total,
            pagination: { pageSize, page }
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED, books, meta);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

/** 
 * get Book
 * @param {*} req
 * @param {*} res
*/
exports.getBook = async (req, res, next) => {
    try {
        let filter = {
            _id: req.params.bookId
        };

        let book = await BookService.getBook(filter);

        JsonResponse(res, 200, MSG_TYPES.FETCHED, book);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

/** 
 * update Book
 * @param {*} req
 * @param {*} res
*/
exports.updateBook = async (req, res, next) => {
    try {
        const author = req.user._id;
        const bookId = req.params.bookId;

        await BookService.updateBook(req.body, author, bookId);

        JsonResponse(res, 200, MSG_TYPES.UPDATED);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


/** 
 * delete Book
 * @param {*} req
 * @param {*} res
*/
exports.deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const author = req.user._id;

        await BookService.deleteBook(bookId, author);

        JsonResponse(res, 200, MSG_TYPES.DELETED);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}