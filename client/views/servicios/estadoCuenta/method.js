export let getStatusProfile = function () {
  if (Session.get('statusProfile') === undefined) {
    Meteor.call('StatusProfile', function (error, resultado) {
      if (error) {
        Session.set('statusProfile', {error: true})
      } else {
        Session.set('statusProfile', {response: resultado})
      }
    })
  }
}
