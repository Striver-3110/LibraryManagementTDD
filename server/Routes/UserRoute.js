const express = require('express');
const router = express.Router();

const {signupController,loginController}  = require('../Controller/UserController')

router.post("/sign-in", signupController);
router.post("/login",loginController);

module.exports = router