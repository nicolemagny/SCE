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
 */

/**
 * Este arquivo define um objeto global chamado sockets, ws como também ws_port, sem eles (os objetos)
 * a aplicação não funcionará apropriadamente.
 */
(function () {
  'use strict'

  var ws
  var sockets
  var ws_port = 9005

  window.bootWebSocket = function () {
    return new WebSocket('ws://' + window.location.hostname + ':' + ws_port)
  }

  ws = window.bootWebSocket()

  if (ws != null) {
    sockets = true
  } else {
    console.error('Conexão com o websocket não pôde ser estabelecida, o servidor pode estar fora do ar')
  }

  window.ws = ws
  window.sockets = sockets
  window.ws_port = ws_port
})()

/**
 * Método para tentar se conectar ao servidor do SCE.
 */
window.reconectar = function () {
  if (window.ws.readyState === 3) {
    for (var i = 0; i < 3; i++) {
      if (window.ws.readyState === 3) {
        window.ws = window.bootWebSocket()
      }
    }
  }
}
