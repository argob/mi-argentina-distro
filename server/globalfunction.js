import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { globalInfo } from './startup.js'
import { Sentry } from 'meteor/miar:sentry'

export const captureError = function (objError) {
  if (globalInfo.ambiente !== 'PROD' && globalInfo.ambiente !== 'DESA' && globalInfo.ambiente !== 'QA') {
    console.log(objError)
  } else {
    Sentry.captureError(objError);
  }
}
