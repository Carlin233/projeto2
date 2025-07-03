
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { mensagem } = req.body;
  const data_hora = new Date().toISOString();
db.run(
  `INSERT INTO avisos (mensagem, data_hora) VALUES (?, ?)`,
  [mensagem, data_hora],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: this.lastID });
    }
  );
});

router.get('/', (req, res) => {
  db.all(`SELECT * FROM avisos ORDER BY data_hora DESC LIMIT 5`, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

router.delete('/', (req, res) => {
  db.run(`DELETE FROM avisos`, [], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ sucesso: true });
  });
});

module.exports = router;
