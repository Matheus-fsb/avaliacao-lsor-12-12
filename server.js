// Importa a aplicação e a configuração do banco de dados
const app = require('./src/app');
const sequelize = require('./src/database/database');
require('dotenv').config();

const PORT = process.env.PORT;


// Função principal assíncrona
(async () => {
  try {
    const Users = require('./src/models/Users');
    await Users.sync({ force: false });

    console.log('Database sincronizado com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.log('Erro ao sincronizar o banco de dados:', error);
  }
})();
