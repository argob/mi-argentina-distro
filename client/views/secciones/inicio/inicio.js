import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { moment } from 'meteor/momentjs:moment'
import { StructureTitle } from '/imports/client/defaultStructures'
import './inicio.html'

Template.inicio.onRendered(() => {
  if (window.location.hash) {
    document.getElementById(window.location.hash.substring(1)).scrollIntoView()
  }
})

Template.inicio.helpers({
  inicioTitle: function () {
    let settings = new StructureTitle()
    settings.breadcrumb= false //[{path: 'turnos', pathName: 'Mis turnos'}]
    settings.classTitle= 'title-dashboard d-inline'
    settings.title= 'Bienvenido ' + (Meteor.user() ? Meteor.user().services.oidc.name: '')
    settings.complementoTitle= false //'<i class="fa icono-arg-validez-legal text-primary d-inline" alt="Identidad validada" title="Identidad validada"></i>'
    settings.bajada= false
    return settings
  }
})
