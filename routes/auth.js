var express = require('express');
var router = express.Router();
var User = require('../models/users');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', async function(req, res, next) {
    //1. Ambil data email dan password
    let email = req.body.email;
    let password = req.body.password;

    //2. Cek email dan password ke database 
    // Ini pakai sequelize
    let user = await User.findOne({
        attributes: ['id', 'name', 'email'],
        where: {
            email: email,
            password: password
        }
    });
    // console.log(user);

    //3. Jika valid buatkan token
    if(user){
        //3a. Ambil secret
        dotenv.config();
        const JWT_SECRET = process.env.TOKEN_RAHASIA;
        //3b. Data
        let payload = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        //3c. Set Expired
        let expired = {
            expiresIn: '600s'
        }

        let token = jwt.sign(payload, JWT_SECRET, expired)

        let response = {
            message: "Login berhasil",
            token : token
        }

        res.json(response);
    }
    //4. Jika tidak valid berikan response gagal login
    // res.json({message: "Gagal Login"})
});

module.exports = router;


//POST http://localhost:3000/login