'use strict'
const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('./configurations/varibles');


//rotas
const categoriaRouter = require('../routes/categoria-router');
const produtoRouter = require('../routes/produto-router');
const usuarioRouter = require('../routes/usuario-router');
// cienado/nvcando a api do express
const app = express();

// config de parse JSON
app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: false }))

// config banco de dados
mongoose.connect(variables.Database.connection, { useNewUrlParser: true })



//configurando as rotas
app.use('/api/categoria', categoriaRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/usuario', usuarioRouter);

// exportando api
module.exports = app;