var jwt = require('jsonwebtoken');

var fs = require('fs');

// var privateKey = fs.readFileSync('./src/key/private.pem');
// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });

var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2Njc0NjQ3ODR9.epN0tVcvLEh04GNjgGxHEB9DXnZi0HVvhCZFt9LYeh5idm9tGoY5dDYcv2A7Vfvf3iPuF6dszuXTWfW3mfLeFRGdA6IKOPFD8vBbfzRvAdTD2YcgdDKVpYLmzvrXXtLunPeaxqQKopOnGnx8KTrHSkBr3jg6y9orUhl5iDpCM7RVVfN82JQ-L9vnIIk2iu9EtZCSp8uuvaR-ykrjYEN-VP5ObuHSj_Ja3_xE4e7_yi34i8aVZ7Qil89jRUQuyJnwmtsx55K0llRKyg8BvxV2ISMVItMMv5xRUpL4f2Ka0GrffWDdUo_x48W-LgwOgWjFJfhxC6WzWMJHwO1fM34JFw';
var cert = fs.readFileSync('./src/key/publickey.crt')
jwt.verify(token, cert, { algorithm: ['RS256'] }, function (err, data) {
    console.log(data);
    console.log(err);
})

