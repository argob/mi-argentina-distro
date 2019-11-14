import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { sessionClear } from '/imports/globalfunctions'
import './logout.html'

Template.fail.onRendered(() => {
  if (!Session.get('status')) {
    Router.go('/')
  }
  $('body').append('<iframe src="' + Meteor.settings.public.id + '/salir" style="display:none"></iframe>')
})

Template.fail.helpers({
  status: function () {
    return Session.get('status') === 'fail'
  }
})
