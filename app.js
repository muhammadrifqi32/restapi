// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000; //port

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-type', 'text/plain');
//     res.end("Hello world!"); //yang muncul di search enginge(browser)
// });

// server.listen(port, hostname, () =>{
//     console.log(`App Running On Part ${port}`);
// });

const express = require('express');

const cors = require('cors'); //memberi izin aplikasi luar untuk mengakses end point
const helmet = require('helmet'); //mencegah sql injection
const bodyParser = require('body-parser'); //mengirim data dalam body
const mongoose = require('mongoose'); //untuk me manage mongodb

const app = express(); //app menjalankan fungsi express

const mongoUri = 'mongodb+srv://admin:admin@cluster0-exrrd.gcp.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = () => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
        .then(() => console.log('Connected'))
        .catch(() => console.log('Failed to Connect DB!'))
}

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

//endpoint : localhost:3000/home , home tu endpoint
//res = response
//req = request

const {
    userList,
    getUserById,
    addUser,
    editUser,
    deleteUser,
} = require('./modules/user')

app.get('/users', userList);
app.get('/users/:id', getUserById);
app.put('/users/:id', editUser);
app.delete('/users/:id', deleteUser)
app.post('/users', addUser);

const {
    login,
} = require('./modules/auth')

app.post('/login', login);

app.listen(5000, () => { //declare port untuk menjalankan aplikasi
    console.log('App Running Up!')
});
