const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')

// Lista de rotas
router.get('/', categoriaController.listar)
// router.get('/:id', categoriaController.listarPorId)
router.post('/', categoriaController.inserir)
// router.put('/:id', categoriaController.alterar)
// router.delete('/:id', categoriaController.deletar)
// Exportando as rotas
module.exports = router