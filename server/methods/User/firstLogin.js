import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { _ } from 'meteor/underscore'
import { OIDC } from 'meteor/id:oidc-client'
import { moment } from 'meteor/momentjs:moment'
import { captureError } from '../../globalfunction'

Meteor.methods({
  // Bandera para identificar si el usuario ingresa a MiArgentina por primera vez
  FirstLogin: function (status) {
    let user = Meteor.user()
    if (user !== null && user !== undefined) {
      if (status === 'continuar') {
        Meteor.users.update({'_id': user._id}, {$set: {
          'services.metadata.firstlogin': false
        }})
      };
    };
  },
})
