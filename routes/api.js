const router = require('express').Router();
const badRequest = require('../utils/404');
const auth = require('../middleware/auth');
const { createUser } = require('../controllers/auth');

router.post('/create', auth, createUser);

router.all('*', badRequest);

module.exports = router;
