const Users = require('../models/users.model');
const { encrypt } = require('./helpers');
const uid = require('uid');

exports.userList = (_, res) =>
    Users.find({}, (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result });
    }).select('-password -salt');

exports.getUserById = (req, res) =>
    Users.findOne({ _id: req.params.id }, (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result });
    }).select('-password -salt');

exports.addUser = (req, res) => {
    const salt = uid(10); //() jumlah angka untuk acak salt

    req.body.password = encrypt(req.body.password, salt); //proses enkripsi
    req.body.salt = salt;

    Users.create(req.body, (error, _) => { //password yang masuk hasil setelah enkripsi
        if (error) return res.status(500).json({ error });
        return res.json({ result: 'succes ' });
    }); //create untuk membuat data, req.body = mengambil semua data yg di body
}

exports.editUser = (req, res) => {
    if (req.body.password) delete req.body.password;
    if (req.body.salt) delete req.body.salt;
    Users.findOneAndUpdate({
        _id: req.params.id,
    }, req.body, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result });
    });
};

exports.deleteUser = (req, res) => {
    Users.deleteOne({ _id: req.params.id}, (error, _) => {
        if (error) return res.status(500).json({ error });
        return res.json({ result: 'succes deleted!' });
    })
}