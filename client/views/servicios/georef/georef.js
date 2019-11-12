import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { getProvincias, getLocalidades } from './method'
import { StructureComponent } from '/imports/client/defaultStructures'

Template.pais.onRendered(() => {
  getProvincias()
  Session.set('localidades', {response: false})
})

Template.pais.helpers({
  georefProvincias: function () {
    let settings = new StructureComponent()
    settings.id = 'provincias'
    settings.status = 'none'
    settings.name = 'Provincias'
    settings.size = 4
    settings.service = Session.get('provincias')
    settings.bodyTemplate = 'georefProvincias'
    return settings
  },
  georefLocalidades: function () {
    let settings = new StructureComponent()
    settings.visibility = !Session.get('localidades') || Session.get('localidades').response !== false
    settings.id = 'localidades'
    settings.status = 'none'
    settings.name = 'Localidades'
    settings.size = 4
    settings.service = Session.get('localidades')
    settings.bodyTemplate = 'georefLocalidades'
    return settings
  }
})

Template.georefProvincias.helpers({
  provincias: function () {
    return Session.get('provincias') && Session.get('provincias').response
  }
})

Template.georefProvincias.events({
  'click [data-target="provincia"]': function (event) {
    getLocalidades(event.currentTarget.dataset.id)
  }
})

Template.georefLocalidades.helpers({
  localidades: function () {
    return Session.get('localidades') && Session.get('localidades').response && Session.get('localidades').response.localidades
  },
  paginas: function () {
    return Session.get('localidades') && Session.get('localidades').response && Number(Session.get('localidades').response.total) > 10
  },
  back: function () {
    let response = Session.get('localidades') && Session.get('localidades').response
    return response && Number(response.inicio) - 10 >= 0 ? (Number(response.inicio) - 10).toString(): false
  },
  next: function () {
    let response = Session.get('localidades') && Session.get('localidades').response
    return response && Number(response.inicio) + 10  < Number(response.total) ? (Number(response.inicio) + 10).toString() : false
  }
})

Template.georefLocalidades.events({
  'click .back': function (event) {
    let response = Session.get('localidades') && Session.get('localidades').response
    getLocalidades(response.id, event.currentTarget.dataset.id)
  },
  'click .next': function (event) {
    let response = Session.get('localidades') && Session.get('localidades').response
    getLocalidades(response.id, event.currentTarget.dataset.id)
  }
})
