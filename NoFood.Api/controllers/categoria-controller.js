'use strict'

const repository = require('../repositories/categoria-repository')
const controllerBase = require('../bin/base/controller-base')
const validarion = require('../bin/helpers/validation')
const _repo = new repository();



function categoriaController() {

}

categoriaController.prototype.post = async(req, res) => {
    const _validationContract = new validarion();

    _validationContract.isRequired(req.body.titulo, 'O titulo é obrigatorio.')
    _validationContract.isRequired(req.body.foto, 'A foto é obrigatória')

    controllerBase.post(_repo, _validationContract, req, res)
}

categoriaController.prototype.put = async(req, res) => {

    const _validationContract = new validarion();

    _validationContract.isRequired(req.body.titulo, 'O titulo é obrigatorio.')
    _validationContract.isRequired(req.body.foto, 'A foto é obrigatória')
    _validationContract.isRequired(req.params.id, 'O id é obrigatório')

    controllerBase.put(_repo, _validationContract, req, res)
}

categoriaController.prototype.get = async(req, res) => {
    controllerBase.get(_repo, req, res);
}

categoriaController.prototype.getById = async(req, res) => {
    controllerBase.getById(_repo, req, res);
}

categoriaController.prototype.delete = async(req, res) => {
    controllerBase.delete(_repo, req, res);
}

module.exports = categoriaController;