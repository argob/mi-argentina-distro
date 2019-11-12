import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { _ } from 'meteor/underscore'

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
