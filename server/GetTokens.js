import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { moment } from 'meteor/momentjs:moment'
import { Tokens } from '/lib/collection.js'
import { settings } from './startup.js'
import { captureError } from './globalfunction'

const formatDate = 'DD/MM/YYYY HH:mm:ss'

Meteor.methods({
  UpdateTokens: function () {
    tokenAPIGateway()
  }
})

// Funcion que guarda el Token de APIGateway en collection Tokens y retorna el token a la llamada
export let tokenAPIGateway = function () {
  let tokenAPIGateway = Tokens.findOne({'name': 'APIGateway'})
  if (tokenAPIGateway === undefined || moment(tokenAPIGateway.update, formatDate) < moment()) {
    let now = moment().subtract(3, 'minutes').format(formatDate)
    try {
      let data = (HTTP.post(settings.apiGateway.urlEndpoint + settings.apiGateway.tokenEndpoint, {params:
      {
        'username': settings.apiGateway.username,
        'password': settings.apiGateway.password
      }})).data
      if (tokenAPIGateway !== undefined) {
        Tokens.update({'_id': tokenAPIGateway._id}, {$set:
        {
          'token': data.token,
          'update': moment(now, formatDate).add(Number(data.expires_in), 'seconds').format(formatDate)
        }})
      } else {
        Tokens.insert({
          'name': 'APIGateway',
          'token': data.token,
          'update': moment(now, formatDate).add(Number(data.expires_in), 'seconds').format(formatDate)
        })
      };
      return ('Bearer ' + data.token)
    } catch (e) {
      let user = Meteor.user()
      captureError({ user: user._id, file: 'GetTokens.js', service: 'ApiGateway - Token',  platform: 'ApiGateway', error: e , params: ''})
      throw new Meteor.Error(e, 'Error APIGateway')
    }
  } else {
    return ('Bearer ' + tokenAPIGateway.token)
  }
}
