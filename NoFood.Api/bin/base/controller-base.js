'use strict'

exports.post = async(repository, validationContract, req, res) => {
    try {
        let data = req.body
        if (!validationContract.isValid()) {
            return res.status(400).send({
                message: 'Existem dados invalidos na sua requisição.',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.create(data)
        res.status(201).send(resultado);
    } catch (err) {
        console.error('Erro post com erro', err)
        res.status(500).send({
            message: 'Erro no processamento',
            error: err
        });
    }
}
exports.put = async(repository, validationContract, req, res) => {
    try {
        let data = req.body
        if (!validationContract.isValid()) {
            return res.status(400).send({
                message: 'Existem dados invalidos na sua requisição.',
                validation: validationContract.errors()
            }).end();
            return;
        }
        let resultado = await repository.update(req.params.id, data)
        res.status(202).send(resultado);
    } catch (err) {
        console.error('Erro put com erro', err)
        res.status(500).send({
            message: 'Erro no processamento',
            error: err
        });
    }
}
exports.get = async(repository, req, res) => {
    try {

        let data = await repository.getAll();
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send({
            message: 'Erro no processamento',
            error: err
        });
    }
}
exports.delete = async(repository, req, res) => {
    try {
        let id = req.params.id;

        if (id) {
            let data = await repository.delete(id);
            res.status(200).send({ message: 'Registro excluido com sucesso.' });
        } else {
            res.status(400).send({
                message: 'O parametro id precisa ser informado',
            });
        }

    } catch (err) {
        res.status(500).send({
            message: 'Erro no processamento',
            error: err
        });
    }
}
exports.getById = async(repository, req, res) => {
    try {
        let id = req.params.id;

        if (id) {
            let data = await repository.getById(id);
            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'O parametro id precisa ser informado',
            });
        }

    } catch (err) {
        console.error('Erro put com erro', err)
        res.status(500).send({
            message: 'Erro no processamento',
            error: err
        });
    }
}