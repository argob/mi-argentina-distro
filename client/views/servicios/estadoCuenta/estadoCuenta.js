import { structurePanel } from '/imports/client/defaultStructures'

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
