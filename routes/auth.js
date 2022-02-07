const router = require("express").Router();
const controller = require("../controllers");
const { Auth } = require('../middlewares/auth')
const passport = require('passport');

router.post("/login", controller.auth.login);

router.patch("/resendOtp", controller.auth.resendLink);

router.patch("/change-password", Auth, controller.auth.passwordChange);

router.post('/recover', controller.auth.recover);

router.get('/forgot/:email/:token', controller.auth.reset);

router.post('/reset-password', controller.auth.resetPassword);

module.exports = router