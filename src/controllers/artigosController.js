// Se vamos acessar um banco de dados precisamos do módulo que faz isso

const { Client } = require('pg');

const conexao = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

conexao.connect();

exports.listar = (req, response) => {
  const query = 'select * from public.artigos;'
  conexao.query(query, (err, res) => {
    // console.log(err, res.rows)
    if (err){
      console.log(err)
      response.status(500)
      response.json({"message": "Internal Server Error"})
    } else if (res.rows.length > 0){
      response.status(200)
      response.json(res.rows)
    } else {
      res.status(404)
      res.json({"message": "Nenhuma artigo foi encontrada"})
    }
  })
  }

  exports.inserir = (req, response) => {
    const artigos = {}
    artigos.linkimagem = req.body.linkimagem
    artigos.titulo = req.body.titulo
    artigos.descricao = req.body.descricao
    artigos.linkartigo = req.body.linkartigo
  
    // const query = 'INSERT INTO public.categorias (descricao) VALUES($1);'
    const query = 'INSERT INTO public.artigos (linkimagem, titulo, descricao, linkartigo) VALUES($1, $2, $3, $4);'
    conexao.query(query, [artigos.linkimagem, artigos.titulo, artigos.descricao,artigos.linkartigo], (err, result) => {
      if (err){
        console.log(err)
        response.status(500)
        response.json({"message": "Internal Server Error"})
      } else {
        response.status(201)
        response.json({"message": result.insertId})
        // console.log("message": result.insertId)
      }
    })
  }