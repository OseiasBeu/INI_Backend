const express = require('express')
const router = express.Router()
const admController = require('../controllers/admController')
const apiController = require('../controllers/apiController')

// Lista de rotas eventos
router.get('/eventos',apiController.verificar, admController.listarEventos)
router.post('/inserirevento',apiController.verificar, admController.inserirEvento)
router.delete('/:id',apiController.verificar, admController.deletarEvento)
router.put('/:id',apiController.verificar, admController.alterarEvento)


// Lista de rotas categorias
router.get('/categorias',apiController.verificar, admController.listarCategorias)
router.post('/inserircategoria',apiController.verificar, admController.inserirCategoria)

// Lista de rotas artigos
router.get('/artigos', admController.listarArtigos)
router.post('/inserirartigos',apiController.verificar, admController.inserirArtigo)



// Exportando as rotas
module.exports = router