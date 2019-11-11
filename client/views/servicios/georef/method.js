export let getProvincias = function () {
  if (Session.get('provincias') === undefined) {
    Meteor.call('GetProvincias', function (error, resultado) {
      if (error) {
        Session.set('provincias', {error: true})
      } else {
        Session.set('provincias', {response: resultado})
      }
    })
  }
}

export let getLocalidades = function (id, pagina) {
  Session.delete('localidades')
  Meteor.call('GetLocalidades', id, pagina ,function (error, resultado) {
    if (error) {
      Session.set('localidades', {error: true})
    } else {
      Session.set('localidades', {response: resultado})
    }
  })
}
