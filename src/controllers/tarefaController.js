// Se vamos acessar um banco de dados precisamos do módulo que faz isso

//Criar uma rota para vizualização de todas as tarefas e não somenta as que ainda não foram concluidas
const conexao = require('../config/conexao')
conexao.connect();

exports.listar = (req, response) => {
  const query = 'select t.id,data,c.descricao as categoria,t.descricao FROM public.tarefas as t inner join public.categorias as c on t.categoria_id = c.id where t.realizado = false'
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

// exports.listar2 = (req, res) => {
//   let descricao = req.query.f || ""
//   descricao = "%" + descricao + "%"
//   const query = 'select t.id, t.descricao, t.data, t.realizado, c.descricao as categoria, c.cor from tarefas t, categorias c where t.categoria_id = c.id and t.descricao like $1'
//   conexao.query(query, [descricao], (err, rows) => { {
//     if (err){
//       console.log(err)
//       res.status(500)
//       res.json({"message": "Internal Server Error"})
//     } else if (rows.length > 0){
//       res.status(200)
//       res.json(rows)
//     } else {
//       res.status(404)
//       res.json({"message": "Nenhuma tarefa cadastrada para esta busca"})
//     }
//     }
//   })
// }

exports.listarPorId = (req, response) => {
  const id = req.params.id
  const query = 'select * from tarefas where id = $1'
  conexao.query(query,[id], (err, res) => {
    if (err){
      console.log(err)
      response.status(500)
      response.json({"message": "Internal Server Error"})
    } else if (res.rows.length > 0){
      response.status(200)
      response.json(res.rows)
    } else {
      response.status(404)
      response.json({"message": "Nenhuma tarefa cadastrada com esse id"})
    }
  })
}

exports.inserir = (req, response) => {
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

exports.alterar = (req, response) => {
  const tarefa = {}
  tarefa.id = req.params.id
  tarefa.descricao = req.body.descricao
  tarefa.data = req.body.data
  tarefa.realizado = req.body.realizado
  tarefa.categoria_id = req.body.categoria_id

  const query = 'update public.tarefas set descricao = $1, data = $2, realizado = $3, categoria_id = $4 where id = $5'
  conexao.query(query, [tarefa.descricao, tarefa.data, tarefa.realizado, tarefa.categoria_id, tarefa.id], (err, result) => {
    if (err){
      console.log(err)
      response.status(500)
      response.json({"message": "Internal Server Error"})
    } else if (result.affectedRows > 0){
      response.json({"message": "Tarefa alterada"})
    } else {
      // response.status(404)
      // response.json({"message": "Tarefa não encontrada"})
      response.status(202)
      response.json({"message": "Tarefa alterada"})
    }
  })
}

exports.deletar = (req, response) => {
 
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