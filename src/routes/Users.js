const express = require('express');
const router = express.Router();
const Users = require('../models/Users'); // O caminho para o seu modelo Users

// Rota para criar um novo usuário
router.post('/users', async (req, res) => {
    try {
        const { password, email, name } = req.body;
        await Users.create({
            email: email,
            password: password,
            name: name
        });
        res.status(201).json({ name, email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Rota para deletar um usuário pelo email
router.delete('/users/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await Users.destroy({
      where: { email }
    });

    if (result) {
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
});

// Rota para modificar um usuário pelo email
router.put('/users/:email', async (req, res) => {
  const { email } = req.params;
  const { name, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualizando os dados do usuário
    user.name = name || user.name;
    user.password = password || user.password;

    await user.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
});

// Rota para listar um usuário pelo email
router.get('/users/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await Users.findOne({
        where: { email },
        attributes: ['name', 'email'], // Selecione apenas name e email
      });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.status(200).json(user); // Retorna o nome e o email
    } catch (error) {
      res.status(500).json({ message: 'Erro ao encontrar usuário', error });
    }
  });
  

module.exports = router;
