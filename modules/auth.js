const jwt = require('jsonwebtoken');
const { encrypt } = require('./helpers')

const Users = require('../models/users.model');

exports.login = (req, res) =>
    Users.findOne({ username: req.body.username }, (error, result) => { //body nii liat ke postman
        if (error) return res.status(500).json({ error });
        if (!result) return res.status(404).json({ result : 'not found !'});

        if (result.password === encrypt(req.body.password, result.salt)){
            const token = jwt.sign({
                userId: result._id,
            }, 'admin', { expiresIn: '1h'});
            res.json({ result: token })
        }
        else {
            return res.status(404).json({ result : 'not found !'});
        }
    })

    //findone => menyari satu dokumen