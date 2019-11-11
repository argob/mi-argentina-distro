import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { moment } from 'meteor/momentjs:moment'

Meteor.methods({
  GetNextHoliday: function () {
    this.unblock()
    let user = Meteor.user()
    if (user !== null && user !== undefined) {
      try {
        let diaActual = moment().get('date')
        let mesActual = moment().get('month') + 1
        let listFeriados = JSON.parse(Assets.getText('feriados.json'))
        let proximoFeriado = {}

        proximoFeriado = (_.find(listFeriados, function (feriado) {
          return ((feriado.dia > diaActual && moment(feriado.mes, 'MMMM').get('month') + 1 === mesActual) || moment(feriado.mes, 'MMMM').get('month') + 1 > mesActual)
        }))

        if (!proximoFeriado) {
          consultasFeriados = ['No laborable']

          proximoFeriado = (_.find(listFeriados, function (feriado) {
            return ((feriado.dia > diaActual && moment(feriado.mes, 'MMMM').get('month') + 1 === mesActual) || moment(feriado.mes, 'MMMM').get('month') + 1 > mesActual)
          }))
        }

        if (!proximoFeriado && mesActual === 12){
          diaActual = 0
          mesActual = 1

          proximoFeriado = (_.find(listFeriados, function (feriado) {
            return ((feriado.dia > diaActual && moment(feriado.mes, 'MMMM').get('month') + 1 === mesActual) || moment(feriado.mes, 'MMMM').get('month') + 1 > mesActual)
          }))
        }

        proximoFeriado['diasSiguientes'] = []
        proximoFeriado['mesSiguiente'] = ''
        proximoFeriado['dia'] = [proximoFeriado['dia']]

        _.each(listFeriados, function (feriado) {
          if (feriado.feriado === proximoFeriado.feriado) {
            if (feriado.mes === proximoFeriado.mes) {
              if (parseInt(feriado.dia) > parseInt(proximoFeriado.dia)) {
                proximoFeriado['dia'].push(feriado.dia)
              }
            } else {
              if (moment(feriado.mes, 'MMMM').get('month') + 1 === moment(proximoFeriado.mes, 'MMMM').get('month') + 2) {
                proximoFeriado['diasSiguientes'].push(feriado.dia)
                proximoFeriado['mesSiguiente'] = feriado.mes
              }
            }
          }
        })

        if (proximoFeriado['dia'].length > 1) {
          proximoFeriado['dia'] = proximoFeriado['dia'].join(', ')
          proximoFeriado['dia'] = proximoFeriado['dia'].split('')
          proximoFeriado['dia'].splice(_.lastIndexOf(proximoFeriado['dia'], ','), 1, ' y')
          proximoFeriado['dia'] = proximoFeriado['dia'].join('')
        }

        if (proximoFeriado['diasSiguientes'].length > 1) {
          proximoFeriado['diasSiguientes'] = proximoFeriado['diasSiguientes'].join(', ')
          proximoFeriado['diasSiguientes'] = proximoFeriado['diasSiguientes'].split('')
          proximoFeriado['diasSiguientes'].splice(_.lastIndexOf(proximoFeriado['diasSiguientes'], ','), 1, ' y')
          proximoFeriado['diasSiguientes'] = proximoFeriado['diasSiguientes'].join('')
        }

        return proximoFeriado
      } catch (e) {
        captureError({ user: user._id, file: 'holidays.js', service: 'Feriados', platform: 'JSON file', error: e , params: {}})
        throw new Meteor.Error(e, 'Error')
      }
    } else {
      return false
    }
  }
})
