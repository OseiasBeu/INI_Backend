const express = require('express')
const router = express.Router()
const artigosController = require('../controllers/artigosController')

// Lista de rotas
router.get('/', artigosController.listar)
// router.get('/:id', artigosController.listarPorId)
router.post('/', artigosController.inserir)
// router.put('/:id', artigosController.alterar)
// router.delete('/:id', artigosController.deletar)
// Exportando as rotas
module.exports = router