export let getHoliday = function () {
  if (Session.get('nextHoliday') === undefined) {
    Meteor.call('GetNextHoliday', function (error, resultado) {
      if (error) {
        Session.set('errorNextHoliday', true)
        Session.set('nextHoliday', false)
      } else {
        Session.set('nextHoliday', resultado)
      }
    })
  }
}
