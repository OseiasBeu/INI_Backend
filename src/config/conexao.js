// require('dotenv').config();
const { Client } = require('pg');

const conexao = new Client ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

module.exports = conexao;














