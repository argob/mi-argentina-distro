import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { sessionClear } from '/imports/globalfunctions'
import './expired.html'

Template.expired.onRendered(() => {
  if (!Session.get('status')) {
    Router.go('/')
  } else {
    switch (Session.get('status')) {
      case 'emailVerified':
        window.location.href = Meteor.settings.public.id + '/activar-email/enviar/'
        break
      case 'idLogout':
        console.log('case idLogout')
        window.location.href = Meteor.settings.public.id + '/salir?next=' + Meteor.settings.public.miargentina //+ window.sessionStorage.getItem('PaginaActual')
        break
    }
  }

  $('body').append('<iframe src="' + Meteor.settings.public.id + '/salir" style="display:none"></iframe>')
})

Template.expired.helpers({
  status: function () {
    return Session.get('status') === 'expired'
  }
})
