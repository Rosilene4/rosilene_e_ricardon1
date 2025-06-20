
const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./database');
const Livro = require('./Livro');
const livrosRoutes = require('./livros');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/livros', livrosRoutes);

// Sincronizar com o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});
