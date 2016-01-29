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

'use strict'

// Definindo uma variável basejs global para uso posterior.
window.basejs = true

document.body.ondragstart = false

if (typeof jQuery === 'undefined') {
  throw new Error('base.js need jQuery in order to some functions work.')
} else {
  $(document).ready(function () {
    // Um pouco de falso positivo aqui.
    var bootstrap = (typeof $().popover == 'function')

    if (bootstrap === 'undefined' || bootstrap) {
      $(function () {
        $('[data-toggle="popover"]').popover()
      })

      // Inicializando o componente tooltip.
      $(function () {
          $('[data-toggle="tooltip"]').tooltip()
      })

      // thanks http://goo.gl/WJj13H
      $('body').tooltip({
        selector: '[data-toggle=tooltip]'
      })
    }

    // Eventos em botões desabilitados não irão disparar.
    $('.disabled').click(function (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    })

    var animationTime = 550

    // alerts são ignoráveis
    $('.sce-alert').click(function () {
        $(this).slideUp(animationTime)
    })
  })
}

/**
 * Método para "setar" o valor a um elemento com uma ID específica
 * @param elementID O id do elemento a ser buscado.
 * @param value O novo valor que o elemento vai assumir.
 */
window.setElementValue = function (elementID, value) {
  var elemento = document.getElementById(elementID)
  if (elemento === 'null') {
    console.error('O elemento ' + elementID + ' procurado não foi encontrado.')
  } else {
    elemento.value = value
  }
}
