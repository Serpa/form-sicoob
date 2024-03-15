// import prisma from '../../../lib/prisma'
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// export default async function Register(req, res) {
//     // const { name, phone, email, password, cpf } = req.body
//     const passwordHash = await bcrypt.hash('2165467', 10)
//     try {
//         const user = await prisma.User.create({
//             data: {
//                 name:'Guilherme Serpa Batista',
//                 email:'serpa419@gmail.com',
//                 password: passwordHash
//             }
//         });
//         delete user.password
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(400).json({ message: error })
//     }
// }