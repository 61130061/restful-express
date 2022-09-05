function badRequest (req, res) {
   return res.status(400).json({ 'error': 'Bad Request' });
}

module.exports = badRequest;
