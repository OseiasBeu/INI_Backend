// Importando o expressjs
const express = require('express')
// Criando uma instância do expressjs
const app = express()
//Importanto variaveis de ambiente
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yml')

app.use(morgan('dev'))
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(cors());

// Criando uma rota
app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

// Rotas
const tarefaRouter = require('./routes/tarefaRouter')
app.use('/api/v1/tarefas', tarefaRouter)

const categoriaRouter = require('./routes/categoriaRouter')
app.use('/api/v1/categorias', categoriaRouter)

const artigosRouter = require('./routes/artigosRouter')
app.use('/api/v1/artigos', artigosRouter)

const admRouter = require('./routes/admRouter')
app.use('/api/v1/admRouter', admRouter)

const apiRouter = require('./routes/apiRouter')
app.use('/api/v1/auth', apiRouter)

// Configurando o servidor
const port = process.env.PORT
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })
