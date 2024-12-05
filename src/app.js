const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Middleware de CORS para permitir requisições de outros domínios
app.use(express.json()); // Middleware para interpretar o corpo das requisições como JSON
app.use(express.urlencoded({ extended: true })); // Middleware para interpretar dados de formulários (caso necessário)

// Importa as rotas de usuários
const usersRoutes = require('./routes/Users');

// Usa as rotas de usuários
app.use(usersRoutes); // A URL para as rotas de usuários

// Rota principal para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Rota para lidar com URLs não encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada',
  });
});

module.exports = app;
