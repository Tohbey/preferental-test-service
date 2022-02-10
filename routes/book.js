const router = require("express").Router();
const controller = require("../controllers");
const { Auth, ROLES, hasRole } = require('../middlewares/auth');

router.post('/', [Auth, hasRole(ROLES.AUTHOR)], controller.book.createBook);

router.get('/', Auth, controller.book.getBooks);

router.get('/author', Auth, controller.book.getBooksByAuthor);

router.get('/:bookId', Auth, controller.book.getBook);

router.patch('/:bookId', [Auth, hasRole(ROLES.AUTHOR)], controller.book.updateBook); //not working

router.delete('/:bookId', [Auth, hasRole(ROLES.AUTHOR, ROLES.ADMIN)], controller.book.deleteBook);

module.exports = router;