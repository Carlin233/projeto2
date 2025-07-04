const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/auth/login → resposta informativa para requisições erradas
router.get("/login", (req, res) => {
  res.status(405).json({ erro: "Use o método POST para fazer login." });
});

// POST /api/auth/registro
router.post("/registro", (req, res) => {
  const { usuario, senha, email } = req.body;
  db.run(
    "INSERT INTO usuarios (usuario, senha, email) VALUES (?, ?, ?)",
    [usuario, senha, email],
    function (err) {
      if (err) return res.status(400).json({ erro: "Usuário já existe!" });
      res.json({ sucesso: true });
    }
  );
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  db.get(
    "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?",
    [usuario, senha],
    (err, row) => {
      if (row) res.json({ sucesso: true, usuario });
      else res.status(401).json({ erro: "Login inválido" });
    }
  );
});

// POST /api/auth/recuperar
router.post("/recuperar", (req, res) => {
  const { usuario, email } = req.body;
  db.get(
    "SELECT senha FROM usuarios WHERE usuario = ? AND email = ?",
    [usuario, email],
    (err, row) => {
      if (row) res.json({ senha: row.senha });
      else res.status(404).json({ erro: "Dados não conferem" });
    }
  );
});

module.exports = router;