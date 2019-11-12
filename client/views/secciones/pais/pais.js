import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { moment } from 'meteor/momentjs:moment'
import { StructureTitle } from '/imports/client/defaultStructures'
import './pais.html'

Template.pais.onRendered(() => {
  if (window.location.hash) {
    document.getElementById(window.location.hash.substring(1)).scrollIntoView()
  }
})

Template.pais.helpers({
  pais: function () {
    let settings = new StructureTitle()
    settings.breadcrumb= [{path: 'pais', pathName: 'Georef - Argentina'}]
    settings.classTitle= 'title-dashboard d-inline'
    settings.title= 'Georef - Argentina'
    settings.complementoTitle= false //'<i class="fa icono-arg-validez-legal text-primary d-inline" alt="Identidad validada" title="Identidad validada"></i>'
    settings.bajada= 'Servicio publico de Georef con listado de provincias y sus correspondientes localidades.'
    return settings
  }
})
