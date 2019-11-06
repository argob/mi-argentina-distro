import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { moment } from 'meteor/momentjs:moment'
import { StructureTitle } from '/imports/client/defaultStructures'
import './seccionGenerica.html'

Template.seccionGenerica.onRendered(() => {
  if (window.location.hash) {
    document.getElementById(window.location.hash.substring(1)).scrollIntoView()
  }
})

Template.seccionGenerica.helpers({
  seccionGenerica: function () {
    let settings = new StructureTitle()
    settings.breadcrumb= [{path: 'seccion-generica', pathName: 'Sección genérica'}]
    settings.classTitle= 'title-dashboard d-inline'
    settings.title= 'Seccion Generica'
    settings.complementoTitle= false //'<i class="fa icono-arg-validez-legal text-primary d-inline" alt="Identidad validada" title="Identidad validada"></i>'
    settings.bajada= 'Subtitulo de ejemplo para la sección genérica'
    return settings
  }
})
