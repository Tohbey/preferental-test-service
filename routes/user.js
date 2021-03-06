const router = require("express").Router();
const controller = require("../controllers");
const { Auth, ROLES, hasRole } = require('../middlewares/auth');

router.get("/", [Auth, hasRole(ROLES.ADMIN)], controller.user.getAllUser)

router.get("/me", Auth, controller.user.getMe)

router.get("/:id", Auth, controller.user.getUser)

router.post("/", controller.user.createUser)

router.get('/verify/:email/:token', controller.user.verify)

router.patch("/", Auth, controller.user.updateUser)

router.patch("/me", Auth, controller.user.teminateMe)

module.exports = router