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
  const query = 'select id, descricao from public.categorias;'
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
      res.json({"message": "Nenhuma categoria foi encontrada"})
    }
  })
  }

  exports.inserir = (req, response) => {
    const categoria = {}
    categoria.descricao = req.body.descricao
  
    const query = 'INSERT INTO public.categorias (descricao) VALUES($1);'
    conexao.query(query, [categoria.descricao], (err, result) => {
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