const express = require('express');

const router = express.Router();
const mysql = require('../model/config');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM event';
  mysql.query(sql, (error, results) => {
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(200).json({
        results,
      });
    }
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

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name, start_date } = req.body;
  const sql = 'UPDATE event SET name = ?, start_date = ? WHERE id = ?';
  const values = [name, start_date, id];
  mysql.query(sql, values, (error, results) => {
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    } else if (!name || !start_date) {
      res.status(400).json({
        message: 'Please fill all field',
      });
    } else {
      console.log(results);
      res.status(204).json({
        message: 'Update succesfull',
        results,
      });
    }
  });
});

module.exports = router;
