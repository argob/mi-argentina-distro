import { Meteor } from 'meteor/meteor'
import { ServiceConfiguration } from 'meteor/service-configuration'

ServiceConfiguration.configurations.upsert({ service: 'oidc' }, {
  $set: {
    authEndpoint: Meteor.settings.oidc.authEndpoint,
    tokenEndpoint: Meteor.settings.oidc.tokenEndpoint,
    userinfoEndpoint: Meteor.settings.oidc.userinfoEndpoint,
    clientId: Meteor.settings.oidc.clientId,
    loginStyle: 'redirect',
    secret: Meteor.settings.oidc.secret
  }
})
