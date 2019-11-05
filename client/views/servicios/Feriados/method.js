export let getHoliday = function () {
  if (Session.get('nextHoliday') === undefined) {
    Meteor.call('GetNextHoliday', function (error, resultado) {
      if (error) {
        Session.set('nextHoliday', {error: true})
      } else {
        Session.set('nextHoliday', {response: resultado})
      }
    })
  }
}
