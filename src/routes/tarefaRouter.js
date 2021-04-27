const express = require('express')
const router = express.Router()
const tarefaController = require('../controllers/tarefaController')

// Lista de rotas
router.get('/', tarefaController.listar)
router.get('/todas', tarefaController.listarTodas)
router.get('/:id', tarefaController.listarPorId)
router.post('/', tarefaController.inserir)
router.put('/:id', tarefaController.alterar)
router.delete('/:id', tarefaController.deletar)
// Exportando as rotas
module.exports = router