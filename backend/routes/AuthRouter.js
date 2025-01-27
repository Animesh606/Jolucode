const express = require('express');
const { signup, login } = require('../controllers/AuthControllers');
const { signupValidation, LoginValidation } = require('../middlewares/AuthValidation');

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', LoginValidation, login);



module.exports = router;
