// const jwt = require('jsonwebtoken');
// const config = require('../config/config');

// const signature = (payload) => {
//     return jwt.sign(payload,config.JWT_KEY,  { expiresIn: '1h'})
// }

// const validateSignature = (req) => {    
//     const signature = req.get('Authorization')
//     if (signature) {
//         try {
//             const payload = jwt.verify(signature, config.JWT_KEY, (err, decoded) => {
//                 if (err) {
//                     return true;
//                 }
//                 return decoded
//             })
//             if (payload instanceof Object) {
//                 req.user = payload
//                 return payload
//             } else if (payload) {
//                 return true
//             }
//         } catch (error) {
//             return false
//         }
//     } else return false
// }

// module.exports = {
//     signature,
//     validateSignature
// }
