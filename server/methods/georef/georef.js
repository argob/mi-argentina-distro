import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { captureError } from '../../globalfunction'
import { _ } from 'meteor/underscore'

Meteor.methods({
  GetProvincias: function () {
    this.unblock()
    let user = Meteor.user()
    if (user && user !== null) {
      let url = 'https://apis.datos.gob.ar/georef/api/provincias'
      try {
        let response = HTTP.get(url, {
          timeout: 30000
        }).data.provincias

        return _.sortBy(response, 'nombre')
      } catch (e) {
        if (e.response && e.response.statusCode === 404) {
          return false
        } else {
          captureError({ user: user._id, file: 'georef.js', service: 'Georef Provincias', platform: 'Public URL Georef', error: e , params: {} })
          throw new Meteor.Error(e, 'Error de comunicacion Georef')
        }
      }
    } else {
      return false
    }
  },
  GetLocalidades: function (id,pagina) {
    this.unblock()
    let user = Meteor.user()
    if (user && user !== null && id) {
      let url = 'https://apis.datos.gob.ar/georef/api/localidades'
      pagina = pagina ? pagina : 0
      try {
        let response = HTTP.get(url, {
          params: {
            provincia: id,
            inicio: pagina,
            orden:'nombre'
          },
          timeout: 30000
        }).data

        response.localidades = _.sortBy(response.localidades, 'nombre')
        response.id = id

        return response
      } catch (e) {
        if (e.response && e.response.statusCode === 404) {
          return false
        } else {
          captureError({ user: user._id, file: 'georef.js', service: 'Georef Provincias', platform: 'Public URL Georef', error: e , params: {} })
          throw new Meteor.Error(e, 'Error de comunicacion Georef')
        }
      }
    } else {
      return false
    }
  }
})
