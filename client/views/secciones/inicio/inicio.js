import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { moment } from 'meteor/momentjs:moment'
import { structureTitle } from '/imports/client/defaultStructures'
import './inicio.html'

Template.inicio.onRendered(() => {
  if (window.location.hash) {
    document.getElementById(window.location.hash.substring(1)).scrollIntoView()
  }
})

Template.inicio.helpers({
  inicioTitle: function () {
    structureTitle.breadcrumb= false //[{path: 'turnos', pathName: 'Mis turnos'}]
    structureTitle.classTitle= 'title-dashboard d-inline'
    structureTitle.title= 'Bienvenido ' + (Meteor.user() ? Meteor.user().services.oidc.name: '')
    structureTitle.complementoTitle= false //'<i class="fa icono-arg-validez-legal text-primary d-inline" alt="Identidad validada" title="Identidad validada"></i>'
    structureTitle.bajada= false
    return structureTitle
  }
})
