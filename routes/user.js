const router = require("express").Router();
const controller = require("../controllers");
const {ensureLoggedIn} = require("connect-ensure-login");

router.get("/", ensureLoggedIn("/login"), controller.user.getAllUser)

router.get("/me", ensureLoggedIn("/login"), controller.user.getMe)

router.get("/:id", ensureLoggedIn("/login"), controller.user.getUser)

router.post("/", controller.user.createUser)

router.get('/verify/:email/:token', controller.user.confirmEmail)

router.patch("/", ensureLoggedIn("/login"), controller.user.updateUser)

router.patch("/me", ensureLoggedIn("/login"), controller.user.teminateMe)

module.exports = router