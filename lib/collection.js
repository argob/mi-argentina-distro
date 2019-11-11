import { Meteor } from 'meteor/meteor'

export var Tokens = new Mongo.Collection('tokens')

Meteor.users.allow({
  insert() { return false },
  update() { return false },
  remove() { return false }
})

Meteor.users.deny({
  insert() { return true },
  update() { return true },
  remove() { return true }
})

Tokens.allow({
  insert() { return false },
  update() { return false },
  remove() { return false }
})

Tokens.deny({
  insert() { return true },
  update() { return true },
  remove() { return true }
})
