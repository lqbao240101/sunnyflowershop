import jwt from "jsonwebtoken";

var fs = require('fs')
var privateKey = fs.readFileSync('../key/private.pem');

const generateToken = (id) => {
  return jwt.sign({ id }, privateKey, { algorithm: 'RS256' });
};

export default generateToken;