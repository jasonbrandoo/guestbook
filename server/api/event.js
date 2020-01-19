const express = require('express');

const router = express.Router();
const mysql = require('../model/config');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM event';
  mysql.query(sql, (error, results, fields) => {
    if (error) console.log(error.message);
    res.status(200).json({
      results,
      fields,
    });
  });
});

router.post('/', (req, res) => {
  const { name, start_date } = req.body;
  const sql = 'INSERT INTO event (name, start_date) VALUES (?, ?)';
  const values = [name, start_date];
  mysql.query(sql, values, (error, results) => {
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(200).json({
        message: 'Success',
        results,
      });
    }
  });
});

module.exports = router;
