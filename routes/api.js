const router = require('express').Router();
const badRequest = require('../utils/404');
const auth = require('../middleware/auth');
const { createUser, login, getUser } = require('../controllers/auth');

router.post('/create', auth, createUser);
router.post('/login', auth, login);
router.get('/user', auth, getUser);

router.all('*', badRequest);

module.exports = router;
