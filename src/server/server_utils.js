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
 * Arquivo para prover diversas utilidades ao servidor.
 */

'use strict'

var path = require('path')
var fs = require('fs')
var util = require('util')

// variável que controla se o sce está em modo debug.
var SCEDebug = false

// Nome do log do servidor
var logFile = '/log/server.log'

//
var logPath = path.join(process.cwd(), logFile)

//
var logDir = path.join(process.cwd(), path.dirname(logFile))

// Número de exceções que o servidor sofreu.
var exceptionsCounter = 0

// Diretório absoluto para a pasta pública - do cliente -.
exports.publicDir = function () {
  return path.join(process.cwd(), '/src/public/')
}

/**
 * Função que retorna o caminho absoluto para um arquivo na pasta public.
 * @param file Arquivo a ser buscado.
 */
exports.getFile = function (file) {
  var public_dir = path.join(process.cwd(), '/src/public/')
  return path.join(public_dir, file)
}

/**
 * Função que escreve na saída padrão uma mensagem juntamente com a tipagem do
 * parâmetro variable.
 * @param message O nome da variável a ser testada.
 * @param variable A variável em que será aplicada o typeof.
 */
exports.type = function (message, variable) {
  util.log(message + ' typeof -> ' + typeof (variable))
}

exports.isDebug = function () {
  return SCEDebug
}

exports.setDebug = function (boolean) {
  SCEDebug = boolean
}

/**
 * Função que retorna as propriedades do servidor ao cliente.
 */
exports.getProperties = function () {
  var Properties = {
    exceptions: 0,
    logDir: undefined,
    nodejsVer: undefined,
    execPath: undefined
  }

  Properties.exceptions = exceptionsCounter
  Properties.logDir = logPath
  Properties.nodejsVer = process.version
  Properties.execPath = process.cwd()
  return Properties
}

/**
 * Método que escreve uma mensagem no log.
 * @param message A mensagem a ser escrita no log
 * @param code O código da mensagem a ser escrito no log.
 */
exports.writeLog = function (message, code) {
  var date = Date()

  fs.open(logPath, 'a', function (err, fd) {
    if (err) {
      util.log('Erro ao abrir o arquivo ' + logPath + ' para escrita.')
    } else {
      var logMessage = date + ' LOG: ' + code + ' -> ' + message + '\n'

      fs.appendFileSync(logPath, logMessage, 'utf8',
      function (err) {
        if (err) {
          util.log('Erro ao adicionar texto para o arquivo.')
        }
      })
    }
  })
}

exports.createLogDir = function () {
  try {
    fs.mkdirSync(logDir)
  } catch (e) {
    if (e.code !== 'EEXIST') { throw e }
  }
}
