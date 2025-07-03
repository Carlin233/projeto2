const express = require('express');
const router = express.Router();
const db = require('../db');

// Buscar todos os usuários
router.get('/usuarios', (req, res) => {
  db.all('SELECT id, usuario, email FROM usuarios', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
    res.json(rows);
  });
});

// Apagar TODOS os usuários
router.delete('/usuarios', (req, res) => {
  db.run(`DELETE FROM usuarios`, [], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ sucesso: true });
  });
});

// Apagar um usuário específico por ID
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ erro: 'Erro ao apagar usuário' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ mensagem: 'Usuário apagado com sucesso' });
  });
});

module.exports = router;