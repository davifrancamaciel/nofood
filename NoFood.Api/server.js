'use strict'

const app = require('../NoFood.Api/bin/express');

const variables = require('../NoFood.Api/bin/configurations/varibles');

app.listen(variables.Api.port, () => {
    console.log(`servidor api nofood iniciado na porta ${variables.Api.port}`)
});