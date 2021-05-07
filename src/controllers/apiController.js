// Importações necessárias
// const conexao = require('../config/conexao')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


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


// Função para realizar logon
exports.login = (req, res) => {
    const email = req.body.email
    const senha = req.body.senha
  
    const query = 'select * from usuarios where email = $1'
  
    conexao.query(query, [email], (err, rows) => {
  
      if (err){        
        console.log(err)
        res.status(500)
        res.json({
          auth: false,
          "message": "Internal Server Error"
        })
     
      } else if (rows.length > 0){
        bcrypt.compare(senha, rows[0].senha, (err, resp) => {
          if (resp){
            const usuario = rows[0].id
            jwt.sign({usuario}, process.env.SECRET, {expiresIn: 30}, (err, token) => {
              res.status(200)
              res.json({
                auth: true,
                token: token
              })
            })
          } else {
  
            res.status(403)
            res.json({
              auth: false,
              message: "E-mail e/ou senhas incorreto(s)"
            })
          }
        })
      } else {
        res.status(403)
        res.json({
          auth: false,
          message: "E-mail e/ou senhas incorreto(s)"
        })
      }
    })
  }

// função para verificar autorização para uso de um usuario
exports.verificar = (req, res, next) => {
    const token = req.headers['access-token']
   
    if (!token){
      res.status(401)
      res.send({
        auth: false,
        message: 'O token está em branco'
      })
    }
   
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
     
      if (err){
        res.status(500)
        res.send({
          auth: false,
          message: 'Falha de autenticação'
        })
      } else {
        next()
      }
    })
}

// Função para realizar logoff
exports.logoff = (req, res) => {
    res.status(200)
    res.send({
      auth: false,
      token: null
    })
  }