import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { _ } from 'meteor/underscore'
import { Router } from 'meteor/iron:router'
import { moment } from 'meteor/momentjs:moment'
import { StatusViews } from '/lib/collection.js'
import './views/Global/Layout.html'

Template.registerHelper('getSetting', function (nombre) {
  if (nombre === 'id') {
    return Meteor.settings.public.id
  }
  if (nombre === 'miargentina') {
    return Meteor.settings.public.miargentina
  }
})

Template.registerHelper('fechaActual', function () {
  return moment().format('DD/MM/YYYY')
})

Template.registerHelper('statusOk', function () {
   return Session.get('status') === 'OK'
})

Template.registerHelper('loading', function (name) {
  return Session.get(name) === undefined
})

Template.registerHelper("isEqual", function (element1, element2) {
  return element1 === element2
})

Template.registerHelper('FirstLogin', function () {
  let userMetadata = Meteor.user() && Meteor.user().services && Meteor.user().services.metadata
  return userMetadata && userMetadata.firstlogin === true
})
