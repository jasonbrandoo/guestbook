const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const mysql = require('../model/config');
const checkAuth = require('../middleware/checkAuth');

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

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  const sql = 'SELECT name, password FROM users WHERE name = ?';
  const value = [name];
  mysql.query(sql, value, (mysqlError, results) => {
    if (mysqlError) {
      res.status(400);
      res.json({
        message: mysqlError.message,
      });
    } else if (results.length > 0) {
      const userName = results[0].name;
      const userPassword = results[0].password;
      bcrypt.compare(password, userPassword, (passwordError, same) => {
        if (passwordError) {
          res.status(400);
          res.json({
            message: "Password didn't match",
            passwordError,
          });
        }
        if (same) {
          const token = jwt.sign({ userName }, 'anjing', { expiresIn: '1h' });
          res.status(200);
          res.cookie('token', token, { httpOnly: true, signed: true });
          res.json({
            message: 'Login success',
            results,
          });
        }
      });
    } else {
      res.status(400);
      res.json({
        message: 'User not found',
      });
    }
  });
});

router.get('/auth', checkAuth, (req, res) => {
  res.sendStatus(200);
});

router.get('/read-cookie', (req, res) => {
  const { token } = req.signedCookies;
  res.json({ token });
});

module.exports = router;
