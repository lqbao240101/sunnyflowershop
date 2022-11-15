
// var fs = require('fs')
// var privateKey = fs.readFileSync('../key/private.pem');

// module.export = function generateToken(id) {
//   return jwt.sign({ id }, privateKey, { algorithm: 'RS256' });
// };
const jwt = require("jsonwebtoken");
console.log("1", process.env.JWT_SECRET)
module.exports = {
  generateToken: function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  },
};
