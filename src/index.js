// Importando o expressjs
const express = require('express')

//Importanto variaveis de ambiente
require('dotenv').config()

// Criando uma instância do expressjs
const app = express()

// Criando uma rota
app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

// Criando uma nova rota
app.get('/api/v1', (req, res) => {
    res.json({
      message: "API Tarefas v1"
    })
  })

// Rotas
const tarefaRouter = require('./routes/tarefaRouter')
app.use('/api/v1/tarefas', tarefaRouter)


// Configurando o servidor
const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })