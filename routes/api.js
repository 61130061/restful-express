const router = require('express').Router();
const badRequest = require('../utils/404');

router.get('/hello', (req, res) => {
   return res.status(200).json({ succeed: true, result: 'hello' });
});

router.all('*', badRequest);

module.exports = router;
