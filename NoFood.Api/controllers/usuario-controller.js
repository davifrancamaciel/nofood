'use strict'

const repository = require('../repositories/usuario-repository')
const controllerBase = require('../bin/base/controller-base')
const validation = require('../bin/helpers/validation')
const _repo = new repository();

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const variables = require('../bin/configurations/varibles')

function usuarioController() {

}

usuarioController.prototype.post = async(req, res) => {

    const _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome.')
    _validationContract.isRequired(req.body.email, 'Informe seu email.')
    _validationContract.isValid(req.body.email, 'Email invaido.')
    _validationContract.isRequired(req.body.senha, 'A senha é invalida.')
    _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é invalida.')
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação não sao iguais.')
    if (req.body.email) {
        let usuarioIsEmailExste = await _repo.isEmailExiste(req.body.email);
        if (usuarioIsEmailExste) {
            _validationContract.isTrue((usuarioIsEmailExste.email != undefined), `Já existe o email ${req.body.email} cadastrado em nossa base.`)
        }
    }
    console.log(req.body)
    if (req.body.senha)
        req.body.senha = md5(req.body.senha);

    controllerBase.post(_repo, _validationContract, req, res);
}

usuarioController.prototype.put = async(req, res) => {
    const _validationContract = new validation();

    _validationContract.isRequired(req.params.id, 'Informe id o uduario.')
    _validationContract.isRequired(req.body.nome, 'Informe seu nome.')
    _validationContract.isRequired(req.body.email, 'Informe seu email.')
    _validationContract.isValid(req.body.email, 'Email invaido.')

    let usuarioIsEmailExste = await _repo.isEmailExiste(req.body.email);
    if (usuarioIsEmailExste) {
        _validationContract.isTrue(
            (usuarioIsEmailExste.email != undefined) && (usuarioIsEmailExste._id != req.params.id),
            `Já existe o email ${req.body.email} cadastrado em nossa base.`)
    }

    controllerBase.put(_repo, _validationContract, req, res);
}

usuarioController.prototype.get = async(req, res) => {
    controllerBase.get(_repo, req, res);
}

usuarioController.prototype.getById = async(req, res) => {
    controllerBase.getById(_repo, req, res);
}

usuarioController.prototype.delete = async(req, res) => {
    controllerBase.delete(_repo, req, res);
}

usuarioController.prototype.autenticar = async(req, res) => {

    const _validationContract = new validation();
    _validationContract.isRequired(req.body.email, 'Informe um email válido.')
    _validationContract.isValid(req.body.email, 'Email invaido.')
    _validationContract.isRequired(req.body.senha, 'Informe uma senha válida')

    if (!_validationContract.isValid()) {
        res.status(400).send({ message: 'Não foi possivel efetuar o login.', validation: _validationContract.errors() })
        return
    }

    let usuarioEncontrado = await _repo.autenticar(req.body.email, req.body.senha);
    if (usuarioEncontrado) {
        console.log(usuarioEncontrado)
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign({ user: usuarioEncontrado }, variables.Security.secretyKey)
        })
    } else {
        res.status(404).send({ message: 'Usuario e senha invalidos.' })
    }
}

module.exports = usuarioController;