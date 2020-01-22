const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const mysql = require('../model/config');

router.post('/register', (req, res) => {
  const { name, password } = req.body;
  const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';

  bcrypt.hash(password, 10, (err, encrypted) => {
    if (err) {
      res.status(400);
      res.json({
        message: err.message,
      });
    } else {
      mysql.query(sql, [name, encrypted], (mysqlError, results) => {
        if (mysqlError) {
          res.status(400);
          res.json({
            message: mysqlError.message,
          });
        } else {
          res.status(200);
          res.json({
            message: 'Welcome to the club',
            results,
          });
        }
      });
    }
  });
});

module.exports = router;
