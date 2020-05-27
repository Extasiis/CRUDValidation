const { Router } = require('express');
const router = Router();

const { renderSignUpForm, signin, signup, renderSignInForm, logout } = require('../controllers/users.controller');

router.get('/signup', renderSignUpForm);

router.post('/signup', signup);

router.get('/signin', renderSignInForm);

router.post('/signin', signin);

router.get('/logout', logout); 

module.exports = router;