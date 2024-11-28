const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Rota não encontrada',
  });
});

module.exports = app;