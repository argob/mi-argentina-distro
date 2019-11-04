import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'
import { getHoliday } from '../../servicios/Feriados/feriadosMethod.js'
import './feriados.html'

Template.nextHoliday.onRendered(() => {
  getHoliday()
})

Template.nextHoliday.helpers({
  nextHoliday: function () {
    return Session.get('nextHoliday')
  },
  errorNextHoliday: function () {
    return Session.get('errorNextHoliday')
  }
})
