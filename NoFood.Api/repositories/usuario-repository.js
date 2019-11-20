'use strict'
require('../models/usuario-model')
const repositoryBase = require('../bin/base/repository-base')
const md5 = require('md5')

class usuarioRepository {

    constructor() {
        this._base = new repositoryBase('Usuario');
        this._projection = 'nome email _id';
    }

    async isEmailExiste(Email) {
        return await this._base._model.findOne({ email: Email }, this._projection)
    }
    async autenticar(Email, Senha) {
        let hashSenha = md5(Senha)
        return await this._base._model.findOne({ email: Email, senha: hashSenha }, this._projection)
    }

    async create(data) {
        let userCreated = await this._base.create(data)
        return this._base._model.findById(userCreated._id, this._projection)
    }

    async update(id, data) {
        let usuarioAtualizado = await this._base.update(id, {
            nome: data.nome,
            foto: data.foto,
            email: data.email,
        })
        return this._base._model.findById(usuarioAtualizado._id, this._projection)
    }

    async getAll() {
        return await this._base._model.find({}, this._projection)
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome email _id foto')
    }

    async delete(id) {
        return await this._base.delete(id)
    }
}
module.exports = usuarioRepository;