import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { _ } from 'meteor/underscore'
import { OIDC } from 'meteor/id:oidc-client'
import { moment } from 'meteor/momentjs:moment'
import { captureError } from '../../globalfunction'

Meteor.methods({
  // Bandera para identificar si el usuario ingresa a MiArgentina por primera vez
  StatusProfile: function () {
    let user = Meteor.user()
    if (user !== null && user !== undefined) {
      let profileKeys = [
        'id',
        'given_name',
        'family_name',
        'birthdate',
        'dni_type',
        'dni_number',
        'gender',
        'email',
        'street_name',
        'street_number',
        'appartment_floor',
        'appartment_number',
        'phone_number',
        'postal_code',
        'nationality',
        'country',
        'province',
        'district',
        'locality'
      ]

      let statusProfile = {
        missing: 0,
        percent: 0
      }
      _.each(user.services.oidc, function (value, key) {
        if (profileKeys.indexOf(key) >= 0) {
          if (value === '' || value === null || ((_.isArray(value) || _.isObject(value)) && _.isEmpty(value)) ) {
            statusProfile.missing++
          }
        }
      })

      statusProfile.missing = statusProfile.missing + _.difference(profileKeys, _.keys(user.services.oidc)).length
      statusProfile.percent = parseInt(((100 * (profileKeys.length - statusProfile.missing)) / profileKeys.length).toFixed(2))

      return statusProfile
    };
  },
})
