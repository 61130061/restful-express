
module.exports = async (req, res, next) => {

   // Check if you have auth to access futher excution
   console.log('Checking if you have access');
   next();
}
