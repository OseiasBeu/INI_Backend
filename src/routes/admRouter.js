const express = require('express')
const router = express.Router()
const admController = require('../controllers/admController')

// Lista de rotas eventos
router.get('/eventos', admController.listarEventos)
router.post('/inserirevento', admController.inserirEvento)
router.delete('/:id', admController.deletarEvento)

// Lista de rotas categorias
router.get('/categorias', admController.listarCategorias)
router.post('/inserircategoria', admController.inserirCategoria)

// Lista de rotas artigos
router.get('/artigos', admController.listarArtigos)
router.post('/inserirartigos', admController.inserirArtigo)



// Exportando as rotas
module.exports = router