import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { moment } from 'meteor/momentjs:moment'
import { Tokens } from '/lib/collection.js'
import { globalInfo } from '../startup.js'
import { captureError } from '../globalfunction'

const formatDate = 'DD/MM/YYYY HH:mm:ss'

Meteor.methods({
  UpdateTokens: function () {
    tokenCRM()
    tokenAPIGateway()
  }
})

// Funcion que guarda el Token del CRM en collection Tokens y retorna el token a la llamada
// Funcion que guarda el Token del CRM en collection Tokens y retorna el token a la llamada
export let tokenCRM = function () {
  let tokenCRM = Tokens.findOne({'name': 'CRM'})
  if (tokenCRM === undefined || moment(tokenCRM.update, formatDate) < moment()) {
    let now = moment().subtract(3, 'minutes').format(formatDate)
    let refreshToken = ''
    let grantType = ''
    try {
      if (tokenCRM === undefined || tokenCRM.refresh_token === undefined) {
        grantType = 'password'
        refreshToken = ''
      } else {
        grantType = 'password'
        refreshToken = tokenCRM.refresh_token
      }
      // let token = HTTP.post('https://login.microsoftonline.com/0ad3577c-93f0-450f-8a76-d47c94aad84b/oauth2/token',{params:{ grant_type:'password',username:'id_miargentina@modernizacion.onmicrosoft.com',password:'APIcrm2017',client_id:'20f6ece3-b057-45fa-be12-7f67f906f754',resource:'https://modernizacion.api.crm2.dynamics.com/',client_secret:'IdhWHNAQTodINbPjqBJjz4nNRUJ9byG9LoLmNLsX4cw='}}).data.access_token;
      let data = HTTP.post(globalInfo.crm.tokenEndpoint, {params: {
        grant_type: grantType,
        refresh_token: refreshToken,
        client_id: globalInfo.crm.clientID,
        resource: globalInfo.crm.resource,
        username: globalInfo.crm.username,
        password: globalInfo.crm.password
      }}).data
      if (tokenCRM !== undefined) {
        Tokens.update({'_id': tokenCRM._id}, {$set:
        {
          'token': data.access_token,
          'refresh_token': data.refresh_token,
          'update': moment(now, formatDate).add(Number(data.expires_in), 'seconds').format(formatDate)
        }})
      } else {
        Tokens.insert({
          'name': 'CRM',
          'token': data.access_token,
          'refresh_token': data.refresh_token,
          'update': moment(now, formatDate).add(Number(data.expires_in), 'seconds').format(formatDate)
        })
      };
      return ('Bearer ' + data.access_token)
    } catch (e) {
      let user = Meteor.user()
      captureError({ user: user._id, file: 'GetTokens.js', service: 'CRM - Token',  platform: 'CRM', error: e, params: ''})
      throw new Meteor.Error(e, 'Error API CRM get Token')
    }
  } else {
    return ('Bearer ' + tokenCRM.token)
  }
}

// Funcion que guarda el Token de APIGateway en collection Tokens y retorna el token a la llamada
export let tokenAPIGateway = function () {
  let tokenAPIGateway = Tokens.findOne({'name': 'APIGateway'})
  if (tokenAPIGateway === undefined || moment(tokenAPIGateway.update, formatDate) < moment()) {
    let now = moment().subtract(3, 'minutes').format(formatDate)
    try {
      let data = (HTTP.post(globalInfo.apiGateway.urlEndpoint + globalInfo.apiGateway.tokenEndpoint, {params:
      {
        'username': globalInfo.apiGateway.username,
        'password': globalInfo.apiGateway.password
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
