import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'
import { _ } from 'meteor/underscore'
import { Router } from 'meteor/iron:router'

export var sessionClear = function (llamado) {
  if (llamado === 'expired' || llamado === 'logout' || llamado === 'login' || llamado === 'update') {
    let sessionValues = Session.all()
    _.each(sessionValues, function (value, key) {
      if (llamado === 'update') {
        let ignore = ['formatCUIL', 'beneficiosANSES', 'beneficiosANSESvencidos', 'errorBeneficiosANSES', 'menu', 'confirmacionTurno']
        if (!ignore.includes(key)) {
          Session.delete(key)
        }
      } else {
        if (key !== 'status') {
          Session.delete(key)
        }
      }
    })

    window.sessionStorage.removeItem('datosFormulario')
    window.sessionStorage.removeItem('verificacionINCUCAI')

    if (llamado !== 'update') {
      window.sessionStorage.removeItem('PaginaAnterior')
      window.sessionStorage.removeItem('PaginaActual')
      window.sessionStorage.removeItem('checkStatus')
      window.sessionStorage.removeItem('unload')
      window.sessionStorage.removeItem('login')
    };
  } else {
    if (llamado === 'configurar_servicios') {
      Session.delete('nextHoliday')
      Session.delete('misVencimientosAFIP')
    }
  }

  return true
}

export var newTemplate = function () {
  let currentPath = Router.current().url.replace(Meteor.settings.public.miargentina, '')
  if (window.innerWidth < 750) {
    if (currentPath !== '/inicio'){
      $('#navMobile').addClass('hidden')
      $('#primaryContent').removeClass('forMenuMobile')
    }
  }

  let titulo = ((document.title).split('|'))[0]
  Session.set('menu', titulo)
  try {
    if (!Meteor.user().services.metadata.firstlogin) {
      $('[class="menu active"]').attr('class', 'menu')
      $('[data-id=' + ((window.location.href.split(/[?#]/)[0]).split('/'))[3] + ']').attr('class', 'menu active')
    }
  } catch (e) {}
}

export var paginationLogic = function (pageSelector) {
  $('#' + pageSelector).attr('class', 'pageSelector active')

  let location = Router.current().url.split('/')[Router.current().url.split('/').length - 1]

  let cursos = []
  let pagination = []
  if (location !== 'cursos-finalizados') {
    cursos = Session.get('cursosIniciados')
    pagination = Session.get('pagination')
  } else {
    cursos = Session.get('cursosFinalizados')
    pagination = Session.get('paginationFinalizados')
  }

  Session.set('cursos', (cursos.slice((5 * pageSelector) - 5, 5 * pageSelector)))

  _.each(pagination, function (val) {
    if ((val <= parseInt(pageSelector) - 3 || val > parseInt(pageSelector) + 3 || (parseInt(pageSelector) >= 2 && val === parseInt(pageSelector) + 3)) && ((val !== 5 && parseInt(pageSelector) < 3) || parseInt(pageSelector) >= 3)) {
      $('#' + val).attr('class', 'pageSelector hide')
    } else {
      if (val !== parseInt(pageSelector)) {
        $('#' + val).attr('class', 'pageSelector')
      }
    }
  })

  if (parseInt(pageSelector) > 3) {
    $('#paginationBefore').attr('class', 'disabled')
  } else {
    $('#paginationBefore').attr('class', 'disabled hide')
  }

  if (parseInt(pageSelector) > pagination.length - 3) {
    $('#paginationAfter').attr('class', 'disabled hide')
  } else {
    $('#paginationAfter').attr('class', 'disabled')
  }
}
