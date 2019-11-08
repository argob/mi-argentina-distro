import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { sessionClear } from '/imports/globalfunctions'
import './expired.html'

Template.expired.onRendered(() => {
  if (!Session.get('status')) {
    Router.go('/')
  }
  $('body').append('<iframe src="' + Meteor.settings.public.id + '/salir" style="display:none"></iframe>')
})

Template.expired.helpers({
  status: function () {
    return Session.get('status') === 'expired'
  }
})
