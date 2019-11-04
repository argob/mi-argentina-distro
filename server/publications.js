import { Meteor } from 'meteor/meteor'

Meteor.publish('userInfo', function () {
  if (!this.userId) {
    return this.ready()
  } else {
    return Meteor.users.find({_id: this.userId}, {fields:
    {
      'services.oidc.idType': 1,
      'services.oidc.idNumber': 1,
      'services.oidc.firstName': 1,
      'services.oidc.lastName': 1,
      'services.oidc.name': 1,
      'services.metadata.firstlogin': 1
    }}, {reactive: false})
  }
})
