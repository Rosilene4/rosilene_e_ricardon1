
const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

router.get('/', async (req, res) => {
    const livros = await Livro.findAll();
    res.render('livros/listar', { livros });
});

router.get('/novo', (req, res) => {
    res.render('livros/form', { livro: {}, acao: '/livros/novo' });
});

router.post('/novo', async (req, res) => {
    await Livro.create(req.body);
    res.redirect('/livros');
});

router.get('/editar/:id', async (req, res) => {
    const livro = await Livro.findByPk(req.params.id);
    res.render('livros/form', { livro, acao: '/livros/editar/' + livro.id });
});

router.post('/editar/:id', async (req, res) => {
    await Livro.update(req.body, { where: { id: req.params.id } });
    res.redirect('/livros');
});

router.post('/excluir/:id', async (req, res) => {
    await Livro.destroy({ where: { id: req.params.id } });
    res.redirect('/livros');
});

module.exports = router;
