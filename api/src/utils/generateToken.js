
// var fs = require('fs')
// var privateKey = fs.readFileSync('../key/private.pem');

// module.export = function generateToken(id) {
//   return jwt.sign({ id }, privateKey, { algorithm: 'RS256' });
// };
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = {
  generateToken
}
