const router = require("express").Router();
const controller = require("../controllers");
const { Auth, ROLES, hasRole } = require('../middlewares/auth');

router.post('/', Auth, controller.book.createBook);

router.get('/', Auth, controller.book.getBooks);

router.get('/author', Auth, controller.book.getBooksByAuthor);

router.get('/:bookId', Auth, controller.book.getBook);

router.patch('/:bookId', Auth, controller.book.updateBook);

router.delete('/:bookId', Auth, controller.book.deleteBook);


module.exports = router;