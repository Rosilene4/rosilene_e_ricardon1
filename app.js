
const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./models/database');
const Livro = require('./models/Livro');
const livrosRoutes = require('./routes/livros');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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
