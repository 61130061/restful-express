const { verifyToken } = require('../utils/jwt');
const cache = require('../utils/cache');

module.exports = async (req, res, next) => {

   let token = req.headers.authorization;
   if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
   }

   if (token) {
      try {
         token = token.trim();
         // Check For Blacklisted Token
         const isBlackListed = await cache.get(token);
         if (isBlackListed) {
            return res.status(401).json({ succeed: false, error: "Unauthorized" });
         }

         const decoded = await verifyToken(token);
         req.user = decoded;
         req.token = token;
         next();
      } catch (err) {
         console.log(err);
         return res.status(401).json({ succeed: false, error: "Authorization Problem" });
      }

   } else {
      // Check if you have auth to access futher excution
      console.log('Checking if you have access');
      return res.status(400).json({ succeed: false, error: "No Authorization Token" });

   }

}
