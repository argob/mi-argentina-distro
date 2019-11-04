import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'
import { getHoliday } from './feriadosMethod.js'
import { structurePanel } from '/imports/client/defaultStructures'
import './feriados.html'

Template.inicio.helpers({
  nextHoliday: function () {
    structurePanel.size = '6'
    structurePanel.id = 'nextHoliday'
    structurePanel.name = 'Próximo feriado'
    structurePanel.service = 'nextHoliday'
    structurePanel.body = 'nextHoliday'
    structurePanel.status = 'primary'
    return structurePanel
  }
})

Template.nextHoliday.onRendered(() => {
  getHoliday()
})

Template.nextHoliday.helpers({
  nextHoliday: function () {
    return Session.get('nextHoliday')
  }
})
