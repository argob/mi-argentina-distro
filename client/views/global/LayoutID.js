import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { Router } from 'meteor/iron:router'
import { _ } from 'meteor/underscore'
import { $ } from 'meteor/jquery'
import './Layout.html'
import '/public/css/bootstrap-switch.min.css'
import '/public/css/poncho.min.css'
import '/public/css/icono-arg.css'
import '/public/css/droid-serif.css'
import '/public/css/roboto-fontface.css'
import '/public/css/miargentina.css'
import '/public/css/watermarked.css'

Template.baseLayoutID.onRendered(() => {
  $('body').addClass('bg-white id-v5')
})

Template.baseLayoutID.onDestroyed(() => {
  $('body').removeClass('bg-white id-v5')
})

Template.baseLayoutID.events({
  'click .login-button': function (event) {
    Session.delete('status')
    window.location.href = Meteor.settings.public.miargentina
  }
})
