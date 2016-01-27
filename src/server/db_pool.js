/**
 * Este arquivo pertence ao SCE - Sistema de Controle de Estágio -, cuja função
 * é realizar o controle de estágio para discentes do IFPA.
 * Copyright (C) 2015  Rafael Campos Nunes
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Pool de conexões.
 *
 * Responsável por gerenciar as conexões com o banco de dados e também fazer
 * querys ao banco.
 */

'use strict'

var mysql = require('mysql')

// SCE
var utils = require('./server_utils.js')

/**
 * Pool de conexões para o banco de dados
 */
var pool = mysql.createPool({
  connectionLimit: 100, // Máximo número de conexões permitidas.
  host: 'localhost',
  user: 'sce',
  password: 'sce_password',
  database: 'sce',
  debugging: false
})

/**
 * @param query_data a query a ser executada no banco de dados.
 * @param {Function} callback chamado ao finalizar a query.
 */
exports.query = function (query_data, callback_return) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback_return(undefined, err)
      utils.writeLog('Um erro ocorreu ao tentar conectar ao banco de dados. Erro: ' + err, '904')
    } else { // conexão ok
      connection.query(query_data, function (err, rows) {
        if (err) {
          callback_return(undefined, err)
        } else {
          if (rows == '') {
            callback_return(undefined, 'Nenhum resultado foi encontrado.')
          } else {
            callback_return(rows, undefined)
          }
        }
      })
    }

    // Does connection pooling rightly.
    if (connection) {
      connection.release()
    }
  })
}
