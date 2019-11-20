'use strict'
require('../models/produto-model')
const repositoryBase = require('../bin/base/repository-base')

class produtoRepository {

    constructor() {
        this._base = new repositoryBase('Produto');
    }

    async create(data) {
        return await this._base.create(data)
    }

    async update(id, data) {
        return await this._base.update(id, data)
    }

    async getAll() {
        return await this._base.getAll()
    }

    async getByid(id) {
        return await this._base.getByid(id)
    }

    async delete(id) {
        return await this._base.delete(data)
    }
}
module.exports = produtoRepository;