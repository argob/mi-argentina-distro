import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { settings } from './startup.js'
import { Sentry } from 'meteor/miar:sentry'

export const captureError = function (objError) {
  if (settings.webApp.ambiente !== 'PROD' && settings.webApp.ambiente !== 'DESA' && settings.webApp.ambiente !== 'QA') {
    console.log(objError)
  } else {
    Sentry.captureError(objError);
  }
}
