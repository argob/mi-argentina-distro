import { StructureComponent } from '/imports/client/defaultStructures'
import { getStatusProfile } from './method'

Template.inicio.onRendered(()=> {
  getStatusProfile()
})

Template.inicio.helpers({
  estadoCuenta: function () {
    let settings = new StructureComponent()
    settings.id = 'estadoCuenta'
    settings.status = 'none'//Session.get('statusProfile') && Session.get('statusProfile').response ?'primary' : settings.status
    settings.name = 'Estado cuenta'
    settings.service = Session.get('statusProfile')
    settings.bodyTemplate = 'estadoCuenta'
    settings.action = {
      name: '', //'collapse', // 'close'
      currentStatus: false
    }
    return settings
  }
})

Template.estadoCuenta.helpers({
  statusProfile: function () {
    return Session.get('statusProfile') && Session.get('statusProfile').response
  }
})
