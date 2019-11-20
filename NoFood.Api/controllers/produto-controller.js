'use strict'

const repository = require('../repositories/produto-repository')
const controllerBase = require('../bin/base/controller-base')
const validarion = require('../bin/helpers/validation')
const _repo = new repository();

function produtoController() {

}

produtoController.prototype.post = async(req, res) => {
    const _validationContract = new validarion();

    _validationContract.isRequired(req.body.nome, 'O nome é obrigatorio.')
    _validationContract.isRequired(req.body.preco, 'O preco é obrigatorio.')
    _validationContract.isRequired(req.body.descricao, 'O descricao é obrigatoria.')
    _validationContract.isRequired(req.body.foto, 'A foto é obrigatória')

    if (req.body.preco) {
        _validationContract.isTrue(req.body.preco == 0, 'O preço deve ser maio que zero')
    }
    controllerBase.post(_repo, _validationContract, req, res)
}

produtoController.prototype.put = async(req, res) => {
    const _validationContract = new validarion();


    _validationContract.isRequired(req.body.nome, 'O nome é obrigatorio.')
    _validationContract.isRequired(req.body.preco, 'O preco é obrigatorio.')
    _validationContract.isRequired(req.body.descricao, 'O descricao é obrigatoria.')
    _validationContract.isRequired(req.body.foto, 'A foto é obrigatória')
    _validationContract.isRequired(req.params.id, 'O id é obrigatório')

    if (req.body.preco) {
        _validationContract.isTrue(req.body.preco == 0, 'O preço deve ser maio que zero')
    }

    controllerBase.put(_repo, _validationContract, req, res)
}

produtoController.prototype.get = async(req, res) => {
    controllerBase.get(_repo, req, res);
}

produtoController.prototype.getById = async(req, res) => {
    controllerBase.getById(_repo, req, res);
}

produtoController.prototype.delete = async(req, res) => {
    controllerBase.delete(_repo, req, res);
}

module.exports = produtoController;