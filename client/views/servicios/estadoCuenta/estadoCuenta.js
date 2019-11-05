import { structurePanel } from '/imports/client/defaultStructures'
import { getStatusProfile } from './method'

Template.inicio.helpers({
  estadoCuenta: function () {
    structurePanel.size = '4 col-xs-12'
    structurePanel.id = 'estadoCuenta'
    structurePanel.name = 'Estado cuenta'
    structurePanel.service = 'estadoCuenta'
    structurePanel.body = 'estadoCuenta'
    return structurePanel
  }
})

Template.estadoCuenta.onRendered(()=> {
  getStatusProfile()
})

Template.estadoCuenta.helpers({
  statusProfile: function () {
    return Session.get('statusProfile') && Session.get('statusProfile').response
  }
})
