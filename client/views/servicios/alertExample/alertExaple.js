import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { StructureComponent } from '/imports/client/defaultStructures'

Template.inicio.helpers({
  alertExample: function () {
    let settings = new StructureComponent()
    //settings.visibility = false
    settings.id = 'alertExample'
    settings.status = 'info'
    settings.border = 'primary'
    settings.size = 12
    settings.name = 'Título del alerta'
    settings.service = {response: true}
    settings.bodyTemplate = 'alertExample'
    settings.action = true
    settings.icono = 'fa-user-circle-o'
    settings.sizeIcono = 4
    return settings
  }
})
