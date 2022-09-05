const { PrismaClient } = require('@prisma/client');
const { createToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
   const { name, phone, password } = req.body;

   const isExist = await prisma.user.findUnique({
      where: {
         phone: phone,
      },
   });

   if (isExist) {
      // Or Login here

      return res.status(400).json({ succeed: false, data: "Phone number already used." });
   }

   try {
      const hashedPass = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
         data: {
            name: name,
            phone: phone,
            password: hashedPass
         }
      });

      return res.status(200).json({ succeed: true, data: newUser });
   } catch (err) {
      console.log(err);
      return res.status(500).json({ succeed: false, data: 'Something is worng.' });
   }
}

exports.login = async (req, res) => {
   const { phone, password } = req.body;

   const user = await prisma.user.findUnique({
      where: { phone }
   });

   if (user) {
      const isPass = await bcrypt.compare(password, user.password);
      if (isPass) {
         const token = await createToken({ id: user.id });
         return res.status(200).json({
            access_token: token,
            token_type: 'Bearer ',
            expires_in: 10800
         });
      }
   }

   return res.status(401).json({ succeed: false, data: 'Unauthorized' });
}
