const crypto = require('crypto');

exports.encrypt = (password, salt) => 
    crypto
    .createHmac('sha256', salt) //salt = code untuk enkripsi
    .update(password)
    .digest('hex');