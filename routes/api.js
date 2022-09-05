const router = require('express').Router();
const badRequest = require('../utils/404');
const auth = require('../middleware/auth');

router.get('/hello', auth, (req, res) => {
   return res.status(200).json({ succeed: true, result: 'hello' });
});

router.all('*', badRequest);

module.exports = router;
