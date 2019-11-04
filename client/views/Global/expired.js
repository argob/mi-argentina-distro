import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import './expired.html'

Template.expired.onRendered(() => {
  $('body').append('<iframe src="' + Meteor.settings.public.id + '/salir" style="display:none"></iframe>')
})

Template.expired.onDestroyed(() => {
  $('body').removeClass('class', 'sticky-footer')
})
