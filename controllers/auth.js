

exports.login = async (req, res) => {
   return res.status(200).json({ succeed: true, data: "hello from login controller" });
}
