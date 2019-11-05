import { StructurePanel } from '/imports/client/defaultStructures'
import { getStatusProfile } from './method'

Template.inicio.onRendered(()=> {
  getStatusProfile()
})

Template.inicio.helpers({
  estadoCuenta: function () {
    let settings = new StructurePanel()
    settings.id = 'estadoCuenta'
    settings.name = 'Estado cuenta'
    settings.service = Session.get('statusProfile')
    settings.bodyTemplate = 'estadoCuenta'
    return settings
  }
})

Template.estadoCuenta.helpers({
  statusProfile: function () {
    return Session.get('statusProfile') && Session.get('statusProfile').response
  }
})
