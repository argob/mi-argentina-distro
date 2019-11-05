import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { _ } from 'meteor/underscore'
import { OIDC } from 'meteor/id:oidc-client'
import { moment } from 'meteor/momentjs:moment'
import { captureError } from '../../globalfunction'

Meteor.methods({
  // Seteos iniciales de un usuario nuevo
  SetUserDefault: function () {
    let user = Meteor.user()
    if (user !== null && user !== undefined) {
      if (user.services.metadata === undefined) {
        Meteor.users.update({'_id':user._id},{$set:{'services.metadata':{'firstlogin': true}}})
      }
    }
  }
})
