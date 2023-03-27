var express = require('express');
var router = express.Router();
var db = require('../modules/db');
var User = require('../models/users');
const { response } = require('express');

/* GET users listing. */
router.get('/', (req, res, next) => {
  
  //Koneksi ke database
  let connection = db.connection;
  
  let sql = "SELECT id, name, email, active FROM users";
  connection.query(sql, (err, rows, fields) => {
    if(err) throw err;
    
    res.json(rows);
  });
  
});

/* TAMBAH USERS */
router.post('/', async (req, res, next) => {
  //1. Buat koneksi ke database
  // let connection = db.connection;
  
  //2. Ambil data yang akan ditambahkan
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let avatar = req.body.avatar;
  let active = req.body.active;
  
  //3. Tambahkan data ke dalam database
  await User.create({
    name: name,
    email: email,
    password: password,
    avatar: avatar,
    active: active
  }).then((res) => {
    let response = {
      message: "Data berhasil ditambahkan",
    };
    
    res.json(response);
  }).catch((err) => {
    console.log(err);
  })

  // let sql = "INSERT INTO users (name, email, password, avatar, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())"
  // connection.query(
  //   sql, 
  //   [name, email, password, avatar, active], 
  //   (err, rows, field) => {
  //     if(err) throw err;
      
  //     let response = {
  //       message: "Data berhasil ditambahkan",
  //       lastId: rows.insertId,
  //       affectedRows: rows.affectedRows
  //     };
      
  //     res.json(response);
  //   })
  });
  
  /* EDIT USERS */
  router.post('/:id/edit', (req, res, next) => {
    //1. Koneksi ke databaes
    let connection = db.connection;
    
    //2. Ambil id data yang akan diedit
    let id = req.params.id;
    
    //3. Ambil data update
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let avatar = req.body.avatar;
    let active = req.body.active;
    
    //4. Update data di database
    let sql = "UPDATE users SET name=?, email=?, password=?, avatar=?, active=?, updated_at = now() WHERE id=?";
    connection.query(
      sql, 
      [name, email, password, avatar, active, id], 
      (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil diupdate",
          affectedRows: rows.affectedRows
        };
        
        res.json(response);
      });
    });
    
    /* DELETE USERS */
    router.post('/:id/delete', (req, res, next) => {
      //1. Koneksi ke database
      let connection = db.connection;
      
      //2. Ambil ID data yang akan dihapus (M DZAKY)
      let id = req.params.id;
      
      //3. Hapus data dari database
      let sql = 'DELETE FROM users WHERE id=?';
      connection.query(sql, [id], (err, rows, fields) => {
        if(err) throw err;
        
        let response = {
          message: "Data berhasil dihapus",
          affectedRows: rows.affectedRows
        };
        
        res.json(response);
      });
    });
    
    module.exports = router;
    