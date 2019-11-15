import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { _ } from 'meteor/underscore'
import { OIDC } from 'meteor/id:oidc-client'
import { moment } from 'meteor/momentjs:moment'
import { captureError } from '../../globalfunction'
import { settings } from '../../startup'

Meteor.methods({
  // ESTADO DEL USUARIO LOGUEADO
  UserStatus: function () {
    this.unblock()
    let user = Meteor.user()
    if (user !== null && user !== undefined) {
      let status = ''
      let data = {}
      let connectionId = this.connection.id
      let currentConnection = _.find(user.services.resume.loginTokens, function (element) {
        return element.hashedToken === Accounts._getLoginToken(connectionId)
      })

      if (!currentConnection) {
        throw new Meteor.Error('Usuario Deslogueado')
      }

      let revoke = settings.webApp.session.revoke
      let expire = settings.webApp.session.expire
      let validationAttr = ['seconds', 'minutes', 'hours']

      if (!revoke || isNaN(revoke.time) || validationAttr.indexOf(revoke.attr) < 0 || !expire || isNaN(expire.time) || validationAttr.indexOf(expire.attr) < 0 ) {
        console.log("SETTING ERROR")
        throw new Meteor.Error('setting error')
      }


      _.each(user.services.resume.loginTokens, function (element) {
        if (moment(element.when, 'ddd MMM DD YYYY HH:mm:ss [GMT-0300 (ART)]').add(expire.time, expire.attr) < moment()) {
          if (element.hashedToken !== currentConnection.hashedToken) {
            Meteor.users.update({'_id': user._id}, {$pull: {
              'services.resume.loginTokens': {'hashedToken': element.hashedToken}
            }})
          }
        }
      })

      moment.locale('en')
      if (moment(currentConnection.when, 'ddd MMM DD YYYY HH:mm:ss [GMT-0300 (ART)]').add(expire.time, expire.attr) < moment()) {
         // Si alguno de los usuarios expiro hace mas de 5 hs lo deslogueo automaticamente sin alerta de expiracion.
        if (moment(currentConnection.when, 'ddd MMM DD YYYY HH:mm:ss [GMT-0300 (ART)]').add(revoke.time, revoke.attr) < moment()) {
          Meteor.users.update({'_id': user._id}, {$pull: {
             'services.resume.loginTokens': {'hashedToken': currentConnection.hashedToken}
          }})
          throw new Meteor.Error('Usuario Deslogueado')
        } else {
           return 'expired'
        }
      }

      moment.locale('es')

      let accessToken = currentConnection.credentials.access_token
      if (!accessToken) {
        accessToken = user.services.oidc.credentials.access_token
      }

      try {
        data = HTTP.get(Meteor.settings.public.id + '/userinfo/?access_token=' + accessToken, {timeout: 30000}).data
        if (updateUser({data:data, user:user}) === 'update') {
          status = 'update'
        }
      } catch (e) {
        if (e.response && e.response.statusCode === 401) {
          throw new Meteor.Error('Usuario Deslogueado')
        }
      }

      if (status === '') {
        status = 'OK'
      }

      return status
    } else {
      return false
    }
  }
})

// ACTUALIZACION DE DATOS OIDC DEL USUARIO LOGUEADO
let updateUser = function (obj) {
  let oidc = obj.user.services.oidc
  let identity = obj.data
  let serviceData = OIDC.serviceData({identity: identity, OIDCCredentials: oidc.credentials})

  if(!_.isEqual(serviceData, oidc)) {
    Meteor.users.update({'_id': obj.user._id}, {$set: { 'services.oidc': serviceData}})
    return 'update'
  }

  return true
}
