import { Meteor } from 'meteor/meteor'

Meteor.publish('userInfo', function () {
  if (!this.userId) {
    return this.ready()
  } else {
    return Meteor.users.find({_id: this.userId}, {fields:
    {
      'services.oidc.email_verified': 1,
      'services.oidc.given_name': 1,
      'services.oidc.family_name': 1,
      'services.oidc.name': 1,
      'services.metadata.firstlogin': 1
    }}, {reactive: false})
  }
})
