import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { globalInfo } from './startup.js'
import { LogServices } from '/lib/collection.js'

// funcion retorna DNI
export let getdni = function (user) {
  if (user !== null && user !== undefined) {
    let dni
    let oidc = user.services.oidc

    if (oidc.idType === 'CUIL' && oidc.dniType === '') {
      let array = []
      array = oidc.idNumber
      array = _.initial(array, [1])
      array = _.rest(array, array[0])
      dni = array.join('')
      dni = parseInt(dni).toString()
    } else {
      if (oidc.dniType !== '') {
        dni = oidc.dniNumber
      } else {
        dni = undefined
      };
    };
    return dni
  }
}

export const captureError = function (objError) {
  let newrelic = Npm.require('newrelic')
  let formatError = objError.error

  if (formatError.response) {
    objError.statusCode = formatError.response.statusCode
    objError.message = formatError.response.content
  } else {
    objError.statusCode = formatError.code
    objError.message = JSON.stringify(formatError)
  }

  try {
    if (globalInfo.ambiente !== 'PROD' && globalInfo.ambiente !== 'DESA' && globalInfo.ambiente !== 'QA') {
      console.log(objError)
    } else {
      objError = _.omit(objError, 'params')
      newrelic.noticeError({name: objError.statusCode, message: objError.service, stack: objError.message}, objError)
    }
  } catch (e) {}
}

export let logServices = {
  save: function (obj) {
    if (LogServices.findOne({'_id': obj.idUser})) {
      LogServices.update({'_id': obj.idUser}, { $set : {
        [_.keys(obj.service)[0]]: _.values(obj.service)[0]
      }})
    } else {
      LogServices.insert({'_id': obj.idUser, [_.keys(obj.service)[0]]: _.values(obj.service)[0] })
    }
  },
  get: function (id, servicio) {
    let estadoServicio = LogServices.findOne({'_id': id})
    if (estadoServicio && estadoServicio[servicio]) {
      return estadoServicio[servicio]
    } else {
      return null
    }
  },
  remove: function (id, servicio) {
    let estadoServicio = LogServices.findOne({'_id': id})
    if (estadoServicio && estadoServicio[servicio]) {
      LogServices.update({'_id': id}, { $unset : {
        [servicio]: ''
      }})
    }
  }
}
