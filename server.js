const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve os arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')))

// Rota raiz (/) → exibe index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// (Opcional) Rotas diretas para páginas específicas — útil para links diretos
app.get('/envio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'envio.html'));
});

app.get('/tv2.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tv2.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Rotas de API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/avisos', require('./routes/avisos'));
app.use('/api/admin', require('./routes/admin'));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});