'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuario-controller')
const auth = require('../middlewares/autentication')

let _crt = new controller();

// Puplic access
router.post('/registrar', _crt.post)
router.post('/autenticar', _crt.autenticar)

//Token auth required
router.post('/', auth, _crt.post)
router.get('/', auth, _crt.get)
router.get('/:id', auth, _crt.getById)
router.put('/:id', auth, _crt.put)
router.delete('/:id', auth, _crt.delete)


module.exports = router;