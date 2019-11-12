import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { StructureComponent } from '/imports/client/defaultStructures'

Template.inicio.helpers({
  staticPanel: function () {
    let settings = new StructureComponent()
    //settings.visibility = false
    settings.id = 'staticPanel'
    settings.status = 'primary'
    settings.size = 6
    settings.name = 'Ejemplo panel fijo'
    settings.service = {response: true}
    settings.bodyTemplate = 'staticPanel'
    settings.footer = 'footerStaticPanel'
    settings.action = false
    return settings
  }
})
