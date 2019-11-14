import { Meteor } from 'meteor/meteor';
import { Tokens } from '/lib/collection.js';

export const settings = Meteor.settings;

Accounts.onLogin((user) => {
  if (user.type === 'oidc') {
    let loginToken = Accounts._getLoginToken(user.connection.id)
    Meteor.users.update({'_id': user.user._id, 'services.resume.loginTokens.hashedToken': loginToken}, {$set: {
      'services.resume.loginTokens.$.credentials.access_token': user.user.services.oidc.credentials.access_token,
      'services.resume.loginTokens.$.credentials.refresh_token': user.user.services.oidc.credentials.refresh_token,
    }})

    // Seteo inicial Usuario
    Meteor.call('SetUserDefault', function (error, response) {
    });
  }
})

Meteor.startup(function () {

  if (settings.apiGateway.username) {
    Tokens.remove({})

    Meteor.call('UpdateTokens', function (error, result) {
      if (error) {
        console.log(error)
      }
    })
  }
})
