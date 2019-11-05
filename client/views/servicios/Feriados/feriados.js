import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { getHoliday } from './method'
import { StructurePanel } from '/imports/client/defaultStructures'

Template.inicio.onRendered(() => {
  getHoliday()
})

Template.inicio.helpers({
  nextHoliday: function () {
    let settings = new StructurePanel()
    settings.id = 'nextHoliday'
    settings.status = Session.get('nextHoliday') && Session.get('nextHoliday').response ?'primary' : settings.status
    settings.size = 6
    settings.name = 'Próximo feriado'
    settings.service = Session.get('nextHoliday')
    settings.bodyTemplate = 'nextHoliday'
    settings.footer = 'nextHolidayFooter'
    settings.action = {
      close: false,
      collapse: true,
      collapsed: false
    }
    return settings
  }
})

Template.nextHoliday.helpers({
  nextHoliday: function () {
    return Session.get('nextHoliday') && Session.get('nextHoliday').response
  }
})
