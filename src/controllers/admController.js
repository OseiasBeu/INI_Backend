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

//Eventos 
exports.listarEventos = (req, response) => {
    const query = 'select t.id,data,c.descricao as categoria,t.descricao, t.realizado, t.linkimagem FROM public.tarefas as t inner join public.categorias as c on t.categoria_id = c.id'
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
        res.json({"message": "Nenhuma tarefa cadastrada com esse id"})
      }
    })
    }
  
exports.inserirEvento = (req, response) => {
    const tarefa = {}
    tarefa.descricao = req.body.descricao
    tarefa.data = req.body.data
    tarefa.realizado = req.body.realizado
    tarefa.categoria_id = req.body.categoria_id
    
    const query = 'insert into public.tarefas (descricao, data, realizado, categoria_id) values ($1, $2, $3, $4)'
    
    conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.categoria_id], (err, result) => {
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


exports.deletarEvento = (req, response) => {

    const id = req.params.id
    
    const query = 'delete from tarefas where id = $1'
    
    conexao.query(query, [id], (err, result) => {
        if (err){
        console.log(err)
        response.status(500)
        response.json({"message": "Internal Server Error"})
        } else if (result.affectedRows > 0){
        response.status(200)
        response.json({"message": "Tarefa deleta"})
        } else {
        // response.status(404)
        // response.json({"message": "Tarefa não encontrada"})
        response.status(200)
        response.json({"message": "Tarefa deleta"})
        }
    })
    }

//Categorias
exports.listarCategorias = (req, response) => {
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
  
exports.inserirCategoria = (req, response) => {
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

//Artigos
exports.listarArtigos = (req, response) => {
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
  
exports.inserirArtigo = (req, response) => {
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
