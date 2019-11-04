import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { globalInfo } from './startup.js'

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
