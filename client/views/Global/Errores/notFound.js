import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { StructureComponent } from '/imports/client/defaultStructures'

Template.notFound.helpers({
  notFound: function () {
    let settings = new StructureComponent()
    settings.id = 'notFound'
    settings.status = 'warning'
    settings.size = 12
    settings.name = 'No hay información para mostrar'
    settings.service = {response: true}
    settings.bodyTemplate = 'bodyNotfound'
    settings.footer = false
    settings.action = false
    return settings
  }
})
